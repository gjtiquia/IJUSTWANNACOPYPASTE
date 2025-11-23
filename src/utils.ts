import { handle } from "./elysia";

export function isCurl(request: Request): boolean {
    const userAgent = request.headers.get("user-agent");
    if (userAgent && userAgent.toLowerCase().includes("curl")) {
        return true;
    }
    return false;
}

export function handleCurl(request: Request): Response {
    return handle(request);
}
