import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";

const app = new Elysia()
    .use(html())
    .get("/", () => "Hello Elysia")
    .get("/jsx", () => (
        <html>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>
    ))
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
