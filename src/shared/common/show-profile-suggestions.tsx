import { Component, createSignal, For, Show } from "solid-js";
import Icons from "~/assets/icons";
import { UserProps } from "~/types/user-interfaces";
import cn from "~/utilities/cn";
import Avatar from "../components/media/avatar";
import TooltipContainer from "../containers/tooltip";

interface Props {
  suggestions: UserProps<{ isFollow: boolean; haveRequestFollow: boolean }>[];
}

const ShowProfileSuggestions: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const [isDraggable, setIsDraggable] = createSignal<boolean>(false);
  const [isDisabled, setIsDisabled] = createSignal<boolean>(false);

  const onDragging = (event: MouseEvent) => {
    if (!isDraggable()) return;

    setIsDisabled(true);
    elRef!.scrollLeft -= event.movementX;
  };

  const onUnDragging = () => {
    setIsDraggable(false);
    setIsDisabled(false);
  };

  return (
    <div class="flex w-full max-w-md rounded-lg p-2 outline outline-1 outline-[var(--border-primary)]">
      <div
        ref={elRef}
        class="scroll-hidden-x flex w-full max-w-md overflow-auto"
        on:mousemove={onDragging}
        on:mousedown={() => setIsDraggable(true)}
        on:mouseup={onUnDragging}
        on:mouseleave={onUnDragging}
      >
        <div class={cn("pointer-events-auto flex w-full gap-2", { "pointer-events-none select-none": isDisabled() })}>
          <For each={props.suggestions}>
            {(suggestion) => (
              <div class="flex w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-lg bg-[var(--bg-secondary)] p-2">
                <Avatar {...suggestion} class="aspect-square size-16 rounded-full text-2xl" />
                <div class="flex w-full max-w-full flex-col overflow-hidden">
                  <div class="inline-flex w-full max-w-full items-center justify-center overflow-hidden">
                    <a href={`/@${suggestion.username}`} class="truncate text-sm text-blue-600 active:text-blue-700">
                      {suggestion.name}
                    </a>
                    <Show when={suggestion.isVerified}>
                      <TooltipContainer text="Account is verified" class="ml-1 mt-1 flex">
                        <Icons name="verified" class="aspect-square size-4 shrink-0 max-md:size-4" />
                      </TooltipContainer>
                    </Show>
                  </div>
                  <div class="inline-flex w-full max-w-full items-center justify-center overflow-hidden">
                    <span class="truncate text-center text-xs text-[var(--text-secondary-hover)]">@{suggestion.username}</span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default ShowProfileSuggestions;
