import { FreshContext } from "$fresh/server.ts";
import { getValue } from "../../../store.ts";

export const handler = (
    _req: Request,
    ctx: FreshContext & { params: { roomName: string } },
): Response => {
    const roomName = ctx.params.roomName;
    const roomContents = getValue(roomName);

    return new Response(roomContents);
};
