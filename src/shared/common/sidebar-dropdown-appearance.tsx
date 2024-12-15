import { Component, For, Setter, Show } from "solid-js";
import Icons from "~/assets/icons";
import { mutateStore } from "~/stores/manage";
import cn from "~/utilities/cn";

interface Props {
  isDarkMode: boolean;
  setTab: Setter<number>;
  theme: "dark" | "light" | "auto";
}

const SidebarDropdownAppearance: Component<Props> = (props) => {
  const mutate = mutateStore();
  const themes: { value: "dark" | "light" | "auto"; title: string }[] = [
    { value: "light", title: "Light" },
    { value: "dark", title: "Dark" },
    { value: "auto", title: "Auto" },
  ];

  return (
    <>
      <div class="flex w-full flex-col items-center gap-2 p-2">
        <div class="flex w-full items-center gap-4 p-1.5">
          <button
            class="group/icon flex text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            on:click={() => props.setTab(0)}
          >
            <Icons name="arrow" class="aspect-square size-4 shrink-0 rotate-270 group-active/icon:scale-95" />
          </button>
          <span class="flex w-full">Appearance</span>
          <Icons name="theme" isDarkMode={props.isDarkMode} class="aspect-square size-4 shrink-0" />
        </div>
      </div>
      <div class="flex w-full p-3">
        <div class="flex w-full divide-x divide-solid divide-[var(--border-secondary)] overflow-hidden rounded-lg border border-solid border-[var(--border-secondary)] bg-[var(--bg-primary)]">
          <For each={themes}>
            {(item) => (
              <button
                class={cn("flex w-full items-center justify-center p-2 text-center active:bg-[var(--bg-secondary)]", {
                  "bg-[var(--bg-secondary)]": props.theme === item.value,
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
      </div>
    </>
  );
};

export default SidebarDropdownAppearance;
