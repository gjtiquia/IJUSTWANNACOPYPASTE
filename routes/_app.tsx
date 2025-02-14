import { AppProps } from "$fresh/server.ts";
import ThemeToggle from "../islands/ThemeToggle.tsx";

export default function App({ Component }: AppProps) {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>I JUST WANNA COPY PASTE</title>
                <link rel="stylesheet" href="/styles.css" />

                {/* Prevents white flash on load */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                document.documentElement.classList.add('dark')
                            } else {
                                document.documentElement.classList.remove('dark')
                            }
                        `,
                    }}
                />
            </head>
            <body class="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                <Component />
                <ThemeToggle />
            </body>
        </html>
    );
}
