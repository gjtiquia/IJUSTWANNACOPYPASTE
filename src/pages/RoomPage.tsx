import { html, Html } from "@elysiajs/html";
import { BaseLayout } from "./BaseLayout";

// TODO : mobile styling
// TODO : should also use websocket to auto update if someone pasted
// TODO : should hv some feedback too, cuz sometimes user not sure if sent

export function RoomPage(props: { room: string; contents: string }) {
    return (
        <BaseLayout titleSuffix={"| " + props.room}>
            <section class="pb-2 flex flex-col gap-0.5">
                <p>
                    $ curl -sL cp.gjt.io/{props.room} {">"} contents.txt
                </p>
                <p>
                    $ cat contents.txt | xclip -sel clip{" "}
                    <button
                        data-copy-button
                        class="cursor-pointer text-stone-50/25 hover:text-stone-50/50 border-1 rounded-sm px-2"
                    >
                        Copy
                    </button>
                </p>
                <script src="/scripts/copy-button.ts"></script>
                <p>$ vim contents.txt</p>
            </section>
            <section>
                <RoomFormFragment room={props.room} contents={props.contents} />
            </section>
        </BaseLayout>
    );
}

export function RoomFormFragment(props: {
    room: string;
    contents: string;
    feedback?: string;
}) {
    return (
        <form
            hx-post={"/" + props.room}
            hx-swap="outerHTML"
            class="flex flex-col gap-2"
        >
            <textarea
                data-room-contents
                name="contents"
                class="border-1 rounded-sm border-stone-50/25 w-full px-1"
                rows="10"
            >
                {props.contents}
            </textarea>
            <p>
                $ curl -L cp.gjt.io/{props.room} --data-binary @contents.txt{" "}
                <input
                    type="submit"
                    value="Enter"
                    class="cursor-pointer text-stone-50/25 hover:text-stone-50/50 border-1 rounded-sm px-2"
                />
            </p>
            {props.feedback && (
                <>
                    {props.feedback.split("\n").map((line) => (
                        <p data-room-feedback>{line}</p>
                    ))}
                </>
            )}
            <p class="htmx-indicator">$ # Loading...</p>
        </form>
    );
}
