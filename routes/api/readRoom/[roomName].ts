import { FreshContext } from "$fresh/server.ts";

let count = 0;

export const handler = (
    _req: Request,
    ctx: FreshContext & { params: { roomName: string } },
): Response => {
    const roomName = ctx.params.roomName;

    // TODO : try... in memory storage of creating/joining a room
    // TODO : then try using Unstorage to abstract it
    // TODO : then try setting up Redis
    count++;
    const roomContents =
        `this is dummy room contents of room name: ${roomName}; count: ${count}`;

    return new Response(roomContents);
};
