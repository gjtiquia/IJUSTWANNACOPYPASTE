import { html, Html } from "@elysiajs/html";
import { BaseLayout } from "./BaseLayout";

// TODO : mobile styling, keep in mind small sizes like iPhoneSE

export async function HomePage() {
    const usageMd = Bun.file("./src/markdown/USAGE.md");
    const usageText = await usageMd.text();

    return (
        <BaseLayout>
            <section>
                <p>$ curl -L cp.gjt.io/help</p>
                {usageText.split("\n").map((line, index) => {
                    if (line === "")
                        return <p class="min-h-[1.5rem]">{line}</p>;

                    if (index == 0 || line.startsWith("##"))
                        return <p class="font-bold">{line}</p>;

                    return <p>{line}</p>;
                })}
            </section>
            <section>
                <form data-redirect-form class="flex gap-2">
                    <label for="room">
                        {"$ curl -L cp.gjt.io/"}
                        <input
                            data-redirect-form-room
                            required
                            type="text"
                            // placeholder=""
                            id="room"
                            name="room"
                            class="border-1 border-stone-50/25 rounded-sm px-1"
                        />
                    </label>
                    <input
                        type="submit"
                        value="Enter"
                        class="cursor-pointer text-stone-50/25 hover:text-stone-50/50 border-1 rounded-sm px-2"
                    />
                </form>
                <script src="/scripts/redirect-form.ts"></script>
            </section>
        </BaseLayout>
    );
}
