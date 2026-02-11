import { html, Html } from "@elysiajs/html";

export function BaseLayout(props: { children?: JSX.Element }) {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <script defer src="/public/packages/htmx/htmx.min.js"></script>
                <title>IJUSTWANNACOPYPASTE</title>
            </head>
            <body>
                <header>
                    <h1>IJUSTWANNACOPYPASTE</h1>
                </header>
                {props.children}
            </body>
        </html>
    );
}
