import { Component, createEffect, createSignal, For, Setter, Show } from "solid-js";
import Icons from "~/assets/icons";
import { imageRatio } from "~/configurations/file";
import DropdownContainer from "~/shared/containers/dropdown";
import cn from "~/utilities/cn";

interface Props {
  fileName: string;
  ratio: string;
  onChangeImageRatio: (payload: { fileName: string; imageRatio: string }) => void;
  setIsBussy: Setter<boolean>;
}

const InputRadioImageRatio: Component<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  createEffect(() => {
    if (!isOpen()) {
      props.setIsBussy(false);
    }
  });

  return (
    <DropdownContainer when={isOpen()} onClose={() => setIsOpen(false)}>
      <button
        class={cn("group/icon flex aspect-square size-8 shrink-0 rounded-full bg-[rgba(0,0,0,0.8)] p-2 backdrop-blur-xl", {
          "bg-blue-600": isOpen(),
        })}
        on:click={() => {
          setIsOpen(!isOpen());
          props.setIsBussy(true);
        }}
      >
        <Icons name="gallery" typeGallery="picture" class="text-neutral-50 group-active/icon:scale-95" />
      </button>
      <div
        class={cn(
          "pointer-events-none absolute right-0 top-[calc(100%+0.25rem)] flex origin-top-right scale-50 flex-col gap-3 rounded-lg border border-solid border-[var(--border-secondary)] bg-[var(--bg-primary)] p-3 opacity-0 transition-[transform,opacity]",
          { "pointer-events-auto scale-100 opacity-100": isOpen() },
        )}
      >
        <For each={imageRatio}>
          {(item) => (
            <button
              class="flex w-full items-center gap-4 disabled:cursor-not-allowed"
              on:click={() => props.onChangeImageRatio({ fileName: props.fileName, imageRatio: item })}
            >
              <div class="flex aspect-square size-5 shrink-0 items-center justify-center rounded-full border border-solid border-[var(--text-primary)]">
                <Show when={props.ratio === item}>
                  <span class="flex size-3 rounded-full bg-[var(--text-primary)]"></span>
                </Show>
              </div>
              <span class="text-md flex w-20 text-start capitalize">{item}</span>
            </button>
          )}
        </For>
      </div>
    </DropdownContainer>
  );
};

export default InputRadioImageRatio;
