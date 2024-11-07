export default function EnterRoomUI() {
    function enterRoomButtonOnClick() {
        console.log("enter room clicked!");
    }

    return (
        <>
            <h2 class={"font-bold"}>ENTER A ROOM NAME</h2>
            <input
                class={"w-full max-w-sm border-2 border-gray-500 rounded-md text-center p-1"}
            >
            </input>
            <p>
                <em>(dont worry, any name will do)</em>
            </p>
            <button onClick={enterRoomButtonOnClick}>Enter Room</button>
        </>
    );
}
