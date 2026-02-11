import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import { HomePage } from "./pages/HomePage";

const store = new Map<string, string>();

const helpKeywords = ["help", "h", "man", "manual", "usage"];
function isHelpKeyword(value: string) {
    return helpKeywords.includes(value.toLowerCase().trim());
}

const app = new Elysia()
    .use(html())
    .onError(({ request, error }) => {
        console.error(request.url, error);
    })
    .get("/", ({ request }) => {
        if (isCurl(request)) {
            return newline("Hello World");
        } else {
            return <HomePage />;
        }
    })

    .get("/help", ({ redirect }) => redirect("/"))

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
