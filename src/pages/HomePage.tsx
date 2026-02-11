import { html, Html } from "@elysiajs/html";
import { BaseLayout } from "./BaseLayout";

export function HomePage() {
    return (
        <BaseLayout>
            <form data-redirect-form>
                <label for="room">
                    Room
                    <input
                        data-redirect-form-room
                        required
                        type="text"
                        // placeholder=""
                        id="room"
                        name="room"
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <script src="/scripts/redirect-form.ts"></script>
        </BaseLayout>
    );
}
