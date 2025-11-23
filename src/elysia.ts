import { Elysia, t } from "elysia";

const store: Record<string, string> = {};

const app = new Elysia()
    .get("*", "TODO: help\n")
    .get(":room", (c) => {
        return store[c.params.room];
    })
    .post(":room", async (c) => {
        const text = await c.request.text();
        store[c.params.room] = text;
    });

export async function handleAsync(request: Request): Promise<Response> {
    return app.handle(request);
}
