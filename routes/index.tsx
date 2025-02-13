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
