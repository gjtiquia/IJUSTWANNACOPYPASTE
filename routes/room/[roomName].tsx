import { PageProps } from "$fresh/server.ts";

export default function Room(props: PageProps) {
  return <div>Room Name: {props.params.roomName}</div>;
}
