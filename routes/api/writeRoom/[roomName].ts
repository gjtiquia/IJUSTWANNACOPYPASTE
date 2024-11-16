import { Handlers } from "$fresh/server.ts";
import { setValue } from "../../../store.ts";

export const handler: Handlers = {
    async POST(req, ctx) {
        const roomName = ctx.params.roomName;
        const text = await req.text();

        setValue(roomName, text);

        return new Response();
    },
};
