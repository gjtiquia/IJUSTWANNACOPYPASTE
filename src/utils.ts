import { handleAsync } from "./elysia";

export function isCurl(request: Request): boolean {
    const userAgent = request.headers.get("user-agent");
    if (userAgent && userAgent.toLowerCase().includes("curl")) {
        return true;
    }
    return false;
}

export function handleCurlAsync(request: Request): Promise<Response> {
    return handleAsync(request);
}
