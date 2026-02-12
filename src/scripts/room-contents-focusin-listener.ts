document.body.addEventListener("focusin", (event) => {
    const target = event.target as HTMLElement;
    if (!target.matches("[data-room-contents]")) return;

    document.querySelectorAll("[data-room-feedback]").forEach((el) => {
        const p = el as HTMLElement;
        p.style.display = "none";
    });
});
