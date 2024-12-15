import { Component, createSignal, For, Setter } from "solid-js";
import Icons from "~/assets/icons";
import DropdownContainer from "~/shared/containers/dropdown";
import cn from "~/utilities/cn";

interface Props {
  sortComments: "trending" | "new";
  setSortComments: Setter<"trending" | "new">;
}

const ButtonSortComments: Component<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  const inputs: { name: "trending" | "new"; placeholder: string }[] = [
    { name: "new", placeholder: "New comments" },
    { name: "trending", placeholder: "Trending comments" },
  ];

  return (
    <DropdownContainer when={isOpen()} onClose={() => setIsOpen(false)}>
      <button class="flex shrink-0 items-center gap-2" on:click={() => setIsOpen(!isOpen())}>
        <Icons name="options" typeOptions="short" class="aspect-square size-4 shrink-0" />
        <span class="text-sm">{props.sortComments === "new" ? "New comments" : "Trending comments"}</span>
      </button>
      <div
        class={cn(
          "pointer-events-none absolute left-0 top-[calc(100%+0.5rem)] z-[2] flex min-w-max origin-top-left scale-50 flex-col gap-2 rounded-lg border border-solid border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-1.5 opacity-0 transition-[transform,opacity]",
          { "pointer-events-auto scale-100 opacity-100": isOpen() },
        )}
      >
        <For each={inputs}>
          {(input) => (
            <button
              class={cn(
                "flex shrink-0 items-center gap-2 rounded-lg bg-transparent p-2.5 hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)]",
                { "bg-[var(--bg-secondary-hover)]": props.sortComments === input.name },
              )}
              on:click={() => {
                props.setSortComments(input.name);
                setIsOpen(false);
              }}
            >
              <span class="text-md">{input.placeholder}</span>
            </button>
          )}
        </For>
      </div>
    </DropdownContainer>
  );
};

export default ButtonSortComments;
