import { Elysia, file, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import slugify from "@sindresorhus/slugify";
import { HomePage } from "./pages/HomePage";
import { RoomFormFragment, RoomPage } from "./pages/RoomPage";

// TODO : should implement some sort of guard, max capacity thing, and clear store every 5min or so

const store = new Map<string, string>();

const helpKeywords = ["help", "h", "man", "manual", "usage"];
function isHelpKeyword(value: string) {
    return helpKeywords.includes(value.toLowerCase().trim());
}

// For runtime transpiling ts to js
// https://bun.com/docs/runtime/transpiler
const tsTranspiler = new Bun.Transpiler({ loader: "ts" });

const app = new Elysia()
    .use(html())
    .use(staticPlugin())

    .onError(({ request, error }) => {
        console.error(request.url, error);
    })

    .get("/", ({ request }) => {
        if (isCurl(request)) {
            return file("./src/markdown/USAGE.md");
        } else {
            return <HomePage />;
        }
    })

    .post(
        "/",
        ({ body, set, redirect }) => {
            const roomInput = body.room;
            const roomSlug = slugify(roomInput);
            const roomUrl = "/" + roomSlug;
            set.headers["HX-Redirect"] = roomUrl;
        },
        { body: t.Object({ room: t.String() }) },
    )

    .get("/help", ({ redirect }) => {
        return redirect("/");
    })

    .get("/:room", ({ params, request, status, redirect }) => {
        if (isHelpKeyword(params.room)) {
            return redirect("/help");
        }

        const roomExists = store.has(params.room);
        if (roomExists) {
            const value = store.get(params.room)!;

            if (isCurl(request)) {
                return newline(value);
            } else {
                return <RoomPage room={params.room} contents={value} />;
            }
        } else {
            if (isCurl(request)) {
                return status(
                    400,
                    newline(`Error: Room ${params.room} Not Found!`),
                );
            } else {
                return <RoomPage room={params.room} contents="" />;
            }
        }
    })

    .post(
        "/:room",
        async ({ params, request, status, server }) => {
            if (isHelpKeyword(params.room)) {
                return status(
                    400,
                    newline(
                        `${params.room} is a reserved keyword and cannot be used!`,
                    ),
                );
            }

            let text = "";
            if (isCurl(request)) {
                text = await request.text();
            } else {
                // expecting from form submission
                text = (await request.formData()).get("contents")!.toString();
            }

            store.set(params.room, text);

            // TODO : there is a race condition for the fragment update... leading to them having the same websocket feedback...
            // websocket update, htmx swaps fragment
            const fragment = (
                <RoomFormFragment
                    room={params.room}
                    contents={text}
                    feedback={`cp.gjt.io/${params.room} updated`}
                />
            );
            server?.publish(params.room, fragment.toString());

            const feedback = `successfully copied to cp.gjt.io/${params.room}`;
            if (isCurl(request)) {
                return newline(feedback);
            } else {
                // htmx return fragment
                return (
                    <RoomFormFragment
                        room={params.room}
                        contents={text}
                        feedback={feedback}
                    />
                );
            }
        },
        // { body: t.Object({ contents: t.String() }) },
    )

    .ws("/:room/ws", {
        open(ws) {
            console.log(`/${ws.data.params.room}/ws: open ${ws.id}`);
            ws.subscribe(ws.data.params.room);
        },
        close(ws) {
            console.log(`/${ws.data.params.room}/ws: close ${ws.id}`);
            ws.unsubscribe(ws.data.params.room);
        },
        message(ws, message) {},
    })

    // scripts // TODO : can package this into a plugin
    // note : this only does transpiling and does not do bundling
    .get("/scripts/*", async ({ headers, params, status, set }) => {
        if (headers["sec-fetch-dest"] !== "script")
            return status(400, "expected from script tag");

        set.headers["content-type"] = "text/javascript";

        let relativeFilePath = params["*"];
        if (
            !relativeFilePath.endsWith(".js") &&
            !relativeFilePath.endsWith(".ts")
        )
            relativeFilePath += ".ts";

        const file = Bun.file("./src/scripts/" + relativeFilePath);

        const fileExists = await file.exists();
        if (!fileExists)
            return status(404, `script ${relativeFilePath} not found`);

        const ts = await file.text();
        const js = tsTranspiler.transformSync(ts);

        return js;
    })

    .all("/*", ({ request, status, redirect }) => {
        if (isCurl(request)) {
            return status(
                400,
                newline("Error! curl /help for usage instructions."),
            );
        } else {
            redirect("/");
        }
    })

    .listen(process.env.PORT ?? 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

function isCurl(request: Request) {
    const userAgent = request.headers.get("user-agent");
    return userAgent && userAgent.toLowerCase().includes("curl");
}

function newline(line: string) {
    if (line.endsWith("\n")) return line;
    else return line + "\n";
}
