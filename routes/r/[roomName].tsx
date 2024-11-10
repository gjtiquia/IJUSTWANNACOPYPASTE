import { PageProps } from "$fresh/server.ts";
import PageCenteredContainer from "../../components/PageCenteredContainer.tsx";
import PageHeader from "../../components/PageHeader.tsx";

// TODO : i wonder if its possible to first render loading page while creating room / joining room

export default function Room(
    props: PageProps & { params: { roomName: string } },
) {
    return (
        <PageCenteredContainer>
            <section class={"py-2 flex flex-col items-center"}>
                <PageHeader />
                <h2>
                    Room Name: {props.params.roomName}
                </h2>
                <p>
                    <em>(enter the same room on the other computer)</em>
                </p>
            </section>
        </PageCenteredContainer>
    );
}
