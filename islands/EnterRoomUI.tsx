import { useRef, useState } from "preact/hooks";

export default function EnterRoomUI() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showButton, setShowButton] = useState(false);

    function enterRoomButtonOnClick() {
        console.log(`enter room clicked! input: ${inputRef.current?.value}`);
        // TODO : Redirect to /room/[roomName]
    }

    function onInputUpdate(inputString: string) {
        setShowButton(inputString.length > 0);
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
            {showButton
                ? (
                    <EnterRoomButton
                        enterRoomButtonOnClick={enterRoomButtonOnClick}
                    />
                )
                : <EnterRoomNameHint />}
        </>
    );
}

function EnterRoomButton(
    props: { enterRoomButtonOnClick: () => void },
) {
    // TODO : i wonder if its possible to be an anchor, and the href is from the props
    return (
        <div class={"pt-2"}>
            <button
                class={"bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"}
                onClick={props.enterRoomButtonOnClick}
            >
                Enter Room
            </button>
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
