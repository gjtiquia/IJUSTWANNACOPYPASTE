import { useEffect, useRef, useState } from "preact/hooks";
import * as _std_text from "@std/text";

export default function EnterRoomUI() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        inputRef.current?.addEventListener("keypress", onKeypressEvent);
        return () => {
            inputRef.current?.removeEventListener("keypress", onKeypressEvent);
        };
    }, [roomName]);

    function onKeypressEvent(e: KeyboardEvent) {
        if (e.key === "Enter" && roomName.length > 0) {
            // window is not available in Deno
            globalThis.location.href = "/r/" + roomName;
        }
    }

    function onInputUpdate(inputString: string) {
        // Cap at 24 characters
        const MAX_CHAR = 24;
        if (inputString.length > MAX_CHAR) {
            inputString = inputString.substring(0, MAX_CHAR);
        }

        const roomName = _std_text.toKebabCase(inputString);
        setRoomName(roomName); // Force re-render whole island

        // Don't force correct " " or "-" characters, cuz might be in the middle of typing kebab-case name
        const lastCharacter = inputString[inputString.length - 1];
        if (lastCharacter === " " && inputString.length < MAX_CHAR) return;
        if (lastCharacter === "-" && inputString.length < MAX_CHAR) return;

        inputRef.current!.value = roomName; // Force correct input value
    }

    return (
        <>
            <h2 class={"font-bold"}>ENTER A ROOM NAME</h2>
            <input
                ref={inputRef}
                onInput={(e) => onInputUpdate(e.currentTarget.value)}
                class={"w-full max-w-sm border-2 border-gray-500 rounded-md text-center p-1"}
            >
            </input>
            {roomName.length > 0
                ? (
                    <EnterRoomButton
                        roomName={roomName}
                    />
                )
                : <EnterRoomNameHint />}
        </>
    );
}

function EnterRoomButton(
    props: { roomName: string },
) {
    return (
        <div class={"pt-2"}>
            <a
                href={"/r/" + props.roomName}
                class={"border-2 border-blue-600 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"}
            >
                Enter Room <span class={"font-normal italic"}>{"(Enter)"}</span>
            </a>
        </div>
    );
}

function EnterRoomNameHint() {
    return (
        <p>
            <em>(dont worry, any name will do)</em>
        </p>
    );
}
