import { Component, For, Setter, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Tiptap from "~/shared/components/input/tiptap";

interface Props {
  setValue: SetStoreFunction<{ getHtml: string; getText: string; isActiveComment: boolean; isActiveReaction: boolean }>;
  value: { getHtml: string; getText: string; isActiveComment: boolean; isActiveReaction: boolean };
  disabled?: boolean;
  setIsBussy?: Setter<boolean>;
}

const ManagePostContent: Component<Props> = (props) => {
  const maxLength = 1000;

  const onChecked = (payload: "isActiveComment" | "isActiveReaction") => {
    props.setValue(
      produce((state) => {
        state[payload] = !props.value[payload];
      }),
    );
  };

  const options: { name: "isActiveComment" | "isActiveReaction"; title: string }[] = [
    { name: "isActiveComment", title: "Active comment sections" },
    { name: "isActiveReaction", title: "Active reaction" },
  ];

  return (
    <div class="flex h-full w-full flex-col gap-3 overflow-hidden p-2">
      <div class="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg bg-[var(--bg-primary)] p-2 text-[var(--text-primary)]">
        <div class="flex h-full w-full overflow-hidden">
          <div class="flex h-full w-full">
            <div class="h-full w-full overflow-auto">
              <Tiptap
                value={props.value}
                setValue={props.setValue}
                maxlength={maxLength}
                placeholder="write captions..."
                setIsBussy={props.setIsBussy}
                autoFocus
              />
            </div>
          </div>
        </div>
        <div class="flex w-full items-center justify-end border-t border-solid border-[var(--border-primary)] pt-2">
          <div class="text-sm text-[var(--text-secondary)]">
            {props.value.getText.trim().length.toLocaleString("en-US")} / {maxLength.toLocaleString("en-US")}
          </div>
        </div>
      </div>
      <div class="flex w-full flex-col gap-3 rounded-lg border border-solid border-[var(--border-secondary)] p-3">
        <For each={options}>
          {(option) => (
            <button class="flex w-full items-center gap-4 disabled:cursor-not-allowed" on:click={() => onChecked(option.name)}>
              <div class="flex aspect-square size-5 shrink-0 items-center justify-center rounded-md border border-solid border-[var(--text-primary)]">
                <Show
                  when={props.value[option.name]}
                  children={<span class="flex size-3 rounded-sm bg-[var(--text-primary)]"></span>}
                />
              </div>
              <span class="text-md flex w-full text-start">{option.title}</span>
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export default ManagePostContent;
