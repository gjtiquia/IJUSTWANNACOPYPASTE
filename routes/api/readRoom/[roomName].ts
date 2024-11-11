import { FreshContext } from "$fresh/server.ts";

export const handler = (
    _req: Request,
    ctx: FreshContext & { params: { roomName: string } },
): Response => {
    const roomName = ctx.params.roomName;

    // TODO : try... in memory storage of creating/joining a room
    // TODO : then try using Unstorage to abstract it
    // TODO : then try setting up Redis

    const roomContents =
        `this is dummy room contents of room name: ${roomName}`;

    return new Response(roomContents);
};
