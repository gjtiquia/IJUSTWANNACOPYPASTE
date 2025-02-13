// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_readRoom_roomName_ from "./routes/api/readRoom/[roomName].ts";
import * as $api_writeRoom_roomName_ from "./routes/api/writeRoom/[roomName].ts";
import * as $index from "./routes/index.tsx";
import * as $r_roomName_ from "./routes/r/[roomName].tsx";
import * as $EnterRoomUI from "./islands/EnterRoomUI.tsx";
import * as $RoomIsland from "./islands/RoomIsland.tsx";
import * as $ThemeToggle from "./islands/ThemeToggle.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
    routes: {
        "./routes/_404.tsx": $_404,
        "./routes/_app.tsx": $_app,
        "./routes/api/readRoom/[roomName].ts": $api_readRoom_roomName_,
        "./routes/api/writeRoom/[roomName].ts": $api_writeRoom_roomName_,
        "./routes/index.tsx": $index,
        "./routes/r/[roomName].tsx": $r_roomName_,
    },
    islands: {
        "./islands/EnterRoomUI.tsx": $EnterRoomUI,
        "./islands/RoomIsland.tsx": $RoomIsland,
        "./islands/ThemeToggle.tsx": $ThemeToggle,
    },
    baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
