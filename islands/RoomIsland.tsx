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
                    onRefreshClicked={pullContentsAsync}
                />
            )}
        </PageCenteredContainer>
    );
}

function LoadingSection() {
    // TODO : try to mimic the RoomSection for a skeleton loading UI
    return (
        <section class={"w-full flex-grow flex flex-col items-center"}>
            <div class="
                    flex-grow w-full max-w-screen-md
                    bg-gray-400
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
    props: { initialRoomContents: string; onRefreshClicked: () => void },
) {
    // TODO : implement Send/Refresh

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current!.value = props.initialRoomContents;
        textareaRef.current?.focus(); // TODO : for mobile no need

        textareaRef.current?.addEventListener("keypress", onKeypressEvent);
        return () => {
            textareaRef.current?.removeEventListener(
                "keypress",
                onKeypressEvent,
            );
        };
    }, []);

    function onKeypressEvent(e: KeyboardEvent) {
        console.log(e);

        if (e.key === "\n" && e.ctrlKey) {
            console.log("Send!"); // TODO
        }
    }

    return (
        <section
            class={"w-full max-w-screen-md flex-grow flex flex-col items-center gap-1"}
        >
            <div class={"w-full flex justify-between"}>
                <button
                    class={"border-2 border-blue-600 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-1 text-white rounded-md"}
                >
                    <strong>Send</strong> (Ctrl+Enter)
                </button>
                <button
                    class={"px-4 py-1 border-2 border-blue-600 text-blue-500 hover:bg-blue-100 active:bg-blue-200 font-bold rounded-md"}
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
                    border-2 border-gray-500 
                    rounded-md
                    resize-none
                    p-1
                "
            >
            </textarea>
        </section>
    );
}
