import { PageProps } from "$fresh/server.ts";
import RoomIsland from "../../islands/RoomIsland.tsx";

export default function RoomPage(
    props: PageProps & { params: { roomName: string } },
) {
    return <RoomIsland roomName={props.params.roomName} />;
}
