import { Elysia, file } from "elysia";
import { html, Html } from "@elysiajs/html";
import { HomePage } from "./pages/HomePage";
import { staticPlugin } from "@elysiajs/static";

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

    .get("/help", ({ redirect }) => {
        // TODO : web users...?

        return redirect("/");
    })

    .get("/:room", ({ params, request, status, redirect }) => {
        if (isHelpKeyword(params.room)) {
            // TODO : should web users have some sort of error message...?

            return redirect("/help");
        }

        const roomExists = store.has(params.room);
        if (roomExists) {
            const value = store.get(params.room)!;

            if (isCurl(request)) {
                return newline(value);
            } else {
                // TODO : html RoomPage
                return newline(value);
            }
        } else {
            if (isCurl(request)) {
                return status(
                    400,
                    newline(`Error: Room ${params.room} Not Found!`),
                );
            } else {
                // TODO : html RoomPage, should still go to a room, cuz user may want to input value here
                return redirect("/");
            }
        }
    })

    .post("/:room", async ({ params, request, status }) => {
        if (isHelpKeyword(params.room)) {
            return status(
                400,
                newline(
                    `${params.room} is a reserved keyword and cannot be used!`,
                ),
            );
        }

        const text = await request.text();
        store.set(params.room, text);
        return newline(`room ${params.room}: ${store.get(params.room)}`);
    })

    // scripts // TODO : can package this into a plugin
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
