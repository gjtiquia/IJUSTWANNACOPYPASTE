import { ComponentChildren } from "preact"; // https://preactjs.com/guide/v10/typescript#function-components

export default function PageCenteredContainer(
    props: { children: ComponentChildren },
) {
    return (
        <div class="min-h-dvh flex flex-col items-center p-4">
            {props.children}
        </div>
    );
}
