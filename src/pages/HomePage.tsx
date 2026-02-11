import { html, Html } from "@elysiajs/html";
import { BaseLayout } from "./BaseLayout";

export function HomePage() {
    return (
        <BaseLayout>
            <form>
                <label for="room">
                    Room
                    <input
                        required
                        type="text"
                        // placeholder=""
                        id="room"
                        name="room"
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </BaseLayout>
    );
}
