import { useEffect } from "preact/hooks";

export default function ThemeToggle() {
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        const themeToggleDarkIcon = document.getElementById(
            "theme-toggle-dark-icon",
        );
        const themeToggleLightIcon = document.getElementById(
            "theme-toggle-light-icon",
        );

        // Change the icons inside the button based on previous settings
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            themeToggleLightIcon?.classList.remove("hidden");
        } else {
            themeToggleDarkIcon?.classList.remove("hidden");
        }

        const themeToggleBtn = document.getElementById("theme-toggle");

        function handleClick() {
            // Toggle icons
            themeToggleDarkIcon?.classList.toggle("hidden");
            themeToggleLightIcon?.classList.toggle("hidden");

            // If is dark mode
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark");
                localStorage.theme = "light";
            } else {
                document.documentElement.classList.add("dark");
                localStorage.theme = "dark";
            }
        }

        themeToggleBtn?.addEventListener("click", handleClick);

        // Cleanup event listener
        return () => {
            themeToggleBtn?.removeEventListener("click", handleClick);
        };
    }, []);

    return null;
}
