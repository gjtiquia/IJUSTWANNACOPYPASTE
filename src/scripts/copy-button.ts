// subscribe to the submit event itself, instead of having each element subscribe to the submit event
// this is because, hx-boost does not do full page reloads, so <script> tags will not be reloaded, and it wont subscribe to new elements
document.body.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    if (!target.matches("[data-copy-button]")) return;

    const textarea = document.body.querySelector(
        "[data-room-contents]",
    ) as HTMLTextAreaElement;

    await navigator.clipboard.writeText(textarea.value);
});
