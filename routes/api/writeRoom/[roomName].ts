import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async POST(req, ctx) {
        const roomName = ctx.params.roomName;
        console.log("writeRoom roomName:", roomName);

        const text = await req.text();
        console.log("writeRoom text:", text);

        // TODO : save to Unstorage!

        return new Response();
    },
};
