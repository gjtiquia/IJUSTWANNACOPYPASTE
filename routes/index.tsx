import PageCenteredContainer from "../components/PageCenteredContainer.tsx";
import PageHeader from "../components/PageHeader.tsx";
import EnterRoomUI from "../islands/EnterRoomUI.tsx";

// TODO : generate random name button (adj + animal/plant😂), but better be server side to reduce page size? but then latency?
// TODO : listen to enter key => directly enter

export default function HomePage() {
    return (
        <PageCenteredContainer>
            <section class={"pt-2"}>
                <PageHeader />
            </section>

            <div class="flex-grow"></div>

            <section class={"pt-2 pb-2 flex flex-col gap-4 items-center"}>
                <div class={"flex flex-col items-center"}>
                    <p>all i wanna do is</p>
                    <p>
                        <strong>COPY AND PASTE SOME TEXT</strong>
                    </p>
                    <p>
                        <strong>FROM ONE COMPUTER TO ANOTHER</strong>
                    </p>
                </div>

                <div class={"flex flex-col items-center"}>
                    <p>we're already both connected to the internet</p>
                    <p>it shouldnt be that hard right?</p>
                </div>

                <div class={"flex flex-col items-center"}>
                    <p>i dont wanna download an app</p>
                    <p>i dont wanna sign in to an account</p>
                    <p>i dont care if anyone can see it</p>
                </div>

                <div class={"flex flex-col items-center"}>
                    <p>im not dumb</p>
                    <p>i wont send passwords over the internet</p>
                    <p>
                        <em>(like seriously, dont send ANY sensitive stuff)</em>
                    </p>
                </div>

                <div class={"flex flex-col items-center"}>
                    <p>
                        just let me do it <strong>quick and easy</strong>
                    </p>
                </div>
            </section>

            <div class="flex-grow"></div>

            <section class={"w-full py-2 flex flex-col items-center"}>
                <EnterRoomUI />
            </section>

            <div class="flex-grow"></div>

            <section class={"py-2 flex flex-col items-center"}>
                <p>you will either join or create a new room</p>
                <p>enter the same room on the other computer</p>
            </section>

            <div class="flex-grow"></div>

            <section class={"w-full max-w-md flex justify-center"}>
                <a
                    target="_blank"
                    href={"https://github.com/gjtiquia/IJUSTWANNACOPYPASTE"}
                    class={"text-blue-500 underline hover:text-blue-600 active:text-blue-700"}
                >
                    github source code
                </a>
            </section>
        </PageCenteredContainer>
    );
}
