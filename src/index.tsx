import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import { HomePage } from "./pages/HomePage";

const store = new Map<string, string>();

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

    // TODO : should have a list of reserved keywords
    .get("help", ({ redirect }) => redirect("/"))

    .get(":room", ({ params, request, status, redirect }) => {
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
    .post(":room", async ({ params, request, status }) => {
        const text = await request.text();
        store.set(params.room, text);
        return newline(`room ${params.room}: ${store.get(params.room)}`);
    })
    .all("*", ({ request, status, redirect }) => {
        if (isCurl(request)) {
            return status(
                400,
                newline("Error! curl -L /help for usage instructions."),
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
