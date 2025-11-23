import { Elysia, t } from "elysia";

const app = new Elysia()
    .get("*", "TODO: help\n")
    .get(":room", (c) => `get room: ${c.params.room}\n`)
    .post(":room", async (c) => {
        // console.log(c)

        const blob = await c.request.blob();
        const data = await blob.text();
        console.log(data);

        return `post room: ${c.params.room}\ndata: \n${data}\n`;
    });

export async function handleAsync(request: Request): Promise<Response> {
    return app.handle(request);
}
