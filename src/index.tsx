import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import { HomePage } from "./pages/HomePage";

const app = new Elysia()
    .use(html())
    .get("/", ({ request }) => {
        if (isCurl(request)) return "Hello World\n";
        return <HomePage />;
    })
    .listen(process.env.PORT ?? 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

function isCurl(request: Request) {
    const userAgent = request.headers.get("user-agent");
    return userAgent && userAgent.toLowerCase().includes("curl");
}
