import { Elysia, t } from "elysia";

const app = new Elysia()
    .get("*", "TODO: help\n")
    .get(":room", (c) => `get room: ${c.params.room}\n`)
    .post(":room", async (c) => {
        const text = await c.request.text();
        return `post room: ${c.params.room}\ndata: \n${text}\n`;
    });

export async function handleAsync(request: Request): Promise<Response> {
    return app.handle(request);
}
