import { html, Html } from "@elysiajs/html";
import { BaseLayout } from "./BaseLayout";

export async function HomePage() {
    const usageMd = Bun.file("./src/markdown/USAGE.md");
    const usageText = await usageMd.text();

    return (
        <BaseLayout>
            <section>
                <h2 class="font-bold">$ # Type any name here</h2>
                <form hx-post="/" class="flex flex-wrap gap-2">
                    <label for="room" class="text-nowrap hidden sm:block">
                        {"$ curl -L cp.gjt.io/"}
                    </label>
                    <span class="flex gap-2">
                        <input
                            required
                            type="text"
                            // placeholder=""
                            id="room"
                            name="room"
                            class="border-1 border-stone-50/25 rounded-sm px-1 flex-grow"
                        />
                        <input
                            type="submit"
                            value="Enter"
                            class="cursor-pointer text-stone-50/25 hover:text-stone-50/50 border-1 rounded-sm px-2"
                        />
                    </span>
                </form>
                <p class="min-h-[1.5rem]"></p>
            </section>

            <section class="">
                <p>$ curl -L cp.gjt.io/help</p>
                {usageText.split("\n").map((line, index) => {
                    if (line === "") return <p class="min-h-[1.5rem]"></p>;

                    if (index == 0 || line.startsWith("##"))
                        return <p class="font-bold">{line}</p>;

                    return <p>{line}</p>;
                })}
            </section>
        </BaseLayout>
    );
}
