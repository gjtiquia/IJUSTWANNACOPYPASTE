import { html, Html } from "@elysiajs/html";

export function BaseLayout(props: {
    children?: JSX.Element | JSX.Element[];
    titleSuffix?: string;
}) {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <script src="/public/packages/htmx/htmx.min.js"></script>
                <link href="/public/styles.css" rel="stylesheet" />
                <title>
                    {"IJUSTWANNACOPYPASTE " + (props.titleSuffix ?? "")}
                </title>
            </head>
            <body class="p-2 font-fira bg-stone-900 text-stone-50">
                <header>
                    <h1 class="font-bold pb-1 text-center">
                        <a
                            href="https://github.com/gjtiquia/IJUSTWANNACOPYPASTE"
                            target="_blank"
                        >
                            {"IJUSTWANNACOPYPASTE " + (props.titleSuffix ?? "")}
                        </a>
                    </h1>
                </header>
                <main>{props.children}</main>
            </body>
        </html>
    );
}
