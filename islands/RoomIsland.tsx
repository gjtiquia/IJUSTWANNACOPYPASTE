import { useEffect, useRef, useState } from "preact/hooks";
import PageCenteredContainer from "../components/PageCenteredContainer.tsx";
import PageHeader from "../components/PageHeader.tsx";

export default function RoomIsland(
    props: { roomName: string },
) {
    const [isLoading, setIsLoading] = useState(false);
    const [roomContents, setRoomContents] = useState("");

    useEffect(() => {
        async function onMountAsync() {
            setIsLoading(true);

            const response = await fetch(`/api/readRoom/${props.roomName}`);
            const roomContents = await response.text();
            console.log("roomContents:", roomContents);

            setRoomContents(roomContents);
            setIsLoading(false);
        }

        // Reference: https://devtrium.com/posts/async-functions-useeffect
        onMountAsync().catch(console.error);
    }, []);

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

            {isLoading
                ? <LoadingSection />
                : <RoomSection initialRoomContents={roomContents} />}
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

function RoomSection(props: { initialRoomContents: string }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current!.value = props.initialRoomContents;
        textareaRef.current!.focus();
    }, []);

    return (
        <section class={"w-full flex-grow flex flex-col items-center"}>
            <textarea
                ref={textareaRef}
                spellcheck={false}
                class="
                    flex-grow w-full max-w-screen-md 
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
