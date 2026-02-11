// subscribe to the submit event itself, instead of having each element subscribe to the submit event
// this is because, hx-boost does not do full page reloads, so <script> tags will not be reloaded, and it wont subscribe to new forms
document.body.addEventListener("submit", async (event) => {
    const target = event.target as HTMLElement;
    if (!target.matches("[data-redirect-form]")) return;

    const form = target as HTMLFormElement;

    // Prevent the default form submission (htmx will handle it after preprocessing)
    event.preventDefault();

    const input = form.querySelector(
        "[data-redirect-form-room]",
    ) as HTMLInputElement;

    window.location.href = "/" + input.value;
});
