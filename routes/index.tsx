import PageCenteredContainer from "../components/PageCenteredContainer.tsx";
import PageHeader from "../components/PageHeader.tsx";
import EnterRoomUI from "../islands/EnterRoomUI.tsx";

// TODO : generate random name button (adj + animal/plant😂), but better be server side to reduce page size? but then latency?
// TODO : listen to enter key => directly enter

export default function HomePage() {
    return (
        <PageCenteredContainer>
            <section class={"py-2"}>
                <PageHeader />
            </section>

            <section class={"pt-2 pb-4 flex flex-col items-center"}>
                <p>all i wanna do is</p>
                <p>
                    <strong>COPY AND PASTE SOME TEXT</strong>
                </p>
                <p>
                    <strong>FROM ONE COMPUTER TO ANOTHER</strong>
                </p>
                <br />

                <p>we're already both connected to the internet</p>
                <p>it shouldnt be that hard right?</p>
                <br />

                <p>i dont wanna download an app</p>
                <p>i dont wanna sign in to an account</p>
                <p>i dont care if anyone can see it</p>
                <br />

                <p>im not dumb</p>
                <p>i wont send passwords over the internet</p>
                <p>
                    <em>(like seriously, dont send ANY sensitive stuff)</em>
                </p>
                <p>
                    just let me do it <strong>quick and easy</strong>
                </p>
            </section>

            <section class={"w-full py-4 flex flex-col items-center"}>
                <EnterRoomUI />
            </section>

            <section class={"py-4 flex flex-col items-center"}>
                <p>you will either join or create a new room</p>
                <p>enter the same room on the other computer</p>
            </section>
        </PageCenteredContainer>
    );
}
