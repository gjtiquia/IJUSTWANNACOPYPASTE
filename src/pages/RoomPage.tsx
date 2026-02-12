import { html, Html } from "@elysiajs/html";
import { BaseLayout } from "./BaseLayout";

// TODO : styling - terminal vibes?? but with native browser elements (forms + submit) and mobile support?

export function RoomPage(props: { room: string; contents: string }) {
    return (
        <BaseLayout titleSuffix={"| " + props.room}>
            <RoomFormFragment room={props.room} contents={props.contents} />
        </BaseLayout>
    );
}

export function RoomFormFragment(props: { room: string; contents: string }) {
    return (
        <form hx-post={"/" + props.room} hx-swap="outerHTML">
            <textarea name="contents">{props.contents}</textarea>
            <input type="submit" value="Submit" />
            <p class="htmx-indicator">Loading...</p>
        </form>
    );
}
