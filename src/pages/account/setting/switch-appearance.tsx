import { Component, For, onMount, Show } from "solid-js";
import Icons from "~/assets/icons";
import { mutateStore, selectStore } from "~/stores/manage";
import cn from "~/utilities/cn";

const PageSwitchAppearance: Component = () => {
  const theme = selectStore((store) => store.theme);
  const mutate = mutateStore();

  const themes: { value: "dark" | "light" | "auto"; title: string }[] = [
    { value: "light", title: "Light" },
    { value: "dark", title: "Dark" },
    { value: "auto", title: "Auto" },
  ];

  onMount(() => {
    document.title = "Switch appearance";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Switch appearance";
    });
  });

  return (
    <div class="flex h-fit w-full divide-x divide-solid divide-[var(--border-secondary)] overflow-hidden rounded-lg border border-solid border-[var(--border-secondary)] bg-[var(--bg-primary)]">
      <For each={themes}>
        {(item) => (
          <button
            class={cn("flex w-full items-center justify-center p-2 text-center active:bg-[var(--bg-secondary)]", {
              "bg-[var(--bg-secondary)]": theme() === item.value,
            })}
            on:click={() => mutate("theme", item.value)}
          >
            <Show when={item.value !== "auto"} fallback={item.title}>
              <Icons
                name="theme"
                isDarkMode={item.value === "light" ? false : true}
                class={cn("aspect-square size-4 animate-theme-tilt text-[var(--text-primary)]", {
                  "animate-theme-full-rotate text-yellow-600": item.value === "light",
                })}
              />
            </Show>
          </button>
        )}
      </For>
    </div>
  );
};

export default PageSwitchAppearance;
