import { useEffect, useRef, useState } from "preact/hooks";
import PageCenteredContainer from "../components/PageCenteredContainer.tsx";
import PageHeader from "../components/PageHeader.tsx";

export default function RoomIsland(
    props: { roomName: string },
) {
    const [isLoading, setIsLoading] = useState(false);
    const [roomContents, setRoomContents] = useState("");

    useEffect(() => {
        pullContentsAsync().catch(console.error);
    }, []);

    async function pullContentsAsync() {
        setIsLoading(true);

        const response = await fetch(`/api/readRoom/${props.roomName}`);
        const roomContents = await response.text();
        console.log("roomContents:", roomContents);

        setRoomContents(roomContents);
        setIsLoading(false);
    }

    async function pushContentsAsync(text: string) {
        setIsLoading(true);

        await fetch(`/api/writeRoom/${props.roomName}`, {
            method: "POST",
            body: text,
        });

        setRoomContents(text);
        setIsLoading(false);
    }

    return (
        <PageCenteredContainer>
            <section class={"pb-2 flex flex-col items-center"}>
                <PageHeader />
                <h2>
                    Room Name: <strong>{props.roomName}</strong>
                </h2>
                <p>
                    <em>(enter the same room on the other computer)</em>
                </p>
            </section>

            {isLoading ? <LoadingSection /> : (
                <RoomSection
                    initialRoomContents={roomContents}
                    onSendClicked={pushContentsAsync}
                    onRefreshClicked={pullContentsAsync}
                />
            )}

            <section
                class={"w-full max-w-md flex justify-between items-center"}
            >
                <a
                    target="_blank"
                    href={"https://github.com/gjtiquia/IJUSTWANNACOPYPASTE"}
                    class={"text-blue-500 dark:text-blue-400 underline hover:text-blue-600 dark:hover:text-blue-500 active:text-blue-700 dark:active:text-blue-600"}
                >
                    github source code
                </a>

                <button
                    id="theme-toggle"
                    class="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700"
                >
                    <svg
                        id="theme-toggle-dark-icon"
                        class="hidden w-5 h-5 text-stone-500 dark:text-stone-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z">
                        </path>
                    </svg>
                    <svg
                        id="theme-toggle-light-icon"
                        class="hidden w-5 h-5 text-stone-500 dark:text-stone-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z">
                        </path>
                    </svg>
                </button>
            </section>
        </PageCenteredContainer>
    );
}

function LoadingSection() {
    return (
        <section class={"w-full flex-grow flex flex-col items-center"}>
            <div class="
                    flex-grow w-full max-w-screen-md
                    bg-stone-400 dark:bg-stone-600
                    rounded-md
                    resize-none
                    p-1
                    flex justify-center items-center
                    text-white
                ">
                Loading...
            </div>
        </section>
    );
}

function RoomSection(
    props: {
        initialRoomContents: string;
        onSendClicked: (text: string) => void;
        onRefreshClicked: () => void;
    },
) {
    // TODO : if contents != initialRoomContents, show that it is not sent!

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current!.value = props.initialRoomContents;
        textareaRef.current?.focus(); // TODO : for mobile no need

        textareaRef.current?.addEventListener("keydown", onKeydownEvent);
        return () => {
            textareaRef.current?.removeEventListener(
                "keydown",
                onKeydownEvent,
            );
        };
    }, []);

    function onKeydownEvent(e: KeyboardEvent) {
        // console.log(e);

        const isControlPressed = e.ctrlKey || e.metaKey; // MacOS: Command pressed => metaKey true
        const isEnterPressed = e.key === "\n" || e.key === "Enter";

        if (isControlPressed && isEnterPressed) {
            trySendContents();
        }
    }

    function trySendContents() {
        if (textareaRef.current === null) {
            return;
        }

        const text = textareaRef.current.value;
        props.onSendClicked(text);
    }

    return (
        <section
            class={"w-full max-w-screen-md flex-grow flex flex-col items-center gap-1"}
        >
            <div class={"w-full flex justify-between items-center"}>
                <button
                    class={"border-2 border-blue-600 dark:border-blue-500 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800 px-4 py-1 text-white rounded-md"}
                    onClick={trySendContents}
                >
                    <strong>Send</strong> (Ctrl+Enter)
                </button>

                <button
                    class={"px-4 py-1 border-2 border-blue-600 dark:border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 active:bg-blue-200 dark:active:bg-blue-900/50 font-bold rounded-md"}
                    onClick={props.onRefreshClicked}
                >
                    Refresh
                </button>
            </div>

            <textarea
                ref={textareaRef}
                spellcheck={false}
                class="
                    flex-grow w-full 
                    border-2 border-stone-500 dark:border-stone-600
                    bg-white dark:bg-stone-800
                    text-stone-900 dark:text-stone-100
                    rounded-md
                    resize-none
                    p-1
                "
            >
            </textarea>
        </section>
    );
}
