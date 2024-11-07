import { useRef } from "preact/hooks";

export default function EnterRoomUI() {
    const inputRef = useRef<HTMLInputElement>(null);

    function enterRoomButtonOnClick() {
        console.log(`enter room clicked! input: ${inputRef.current?.value}`);
    }

    return (
        <>
            <h2 class={"font-bold"}>ENTER A ROOM NAME</h2>
            <input
                ref={inputRef}
                class={"w-full max-w-sm border-2 border-gray-500 rounded-md text-center p-1"}
            >
            </input>
            {/* //TODO: conditional render the hint or the button based on if hv text in input component */}
            <p>
                <em>(dont worry, any name will do)</em>
            </p>
            <button onClick={enterRoomButtonOnClick}>Enter Room</button>
        </>
    );
}
