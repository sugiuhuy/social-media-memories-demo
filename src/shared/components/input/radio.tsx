import { Component, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import cn from "~/utilities/cn";

interface Props {
  checked: boolean;
  name: string;
  position: "left" | "right";
  setValue: SetStoreFunction<{ [key: string]: boolean }>;
  title: string;
  value: { [key: string]: boolean };
  description?: string;
  disabled?: boolean;
  type?: "submit" | "button";
}

const InputRadio: Component<Props> = (props) => {
  const onInputValue = () => {
    if (props.disabled) return;
    props.setValue(
      produce((state: any) => {
        for (const key in state) {
          if (Object.prototype.hasOwnProperty.call(state, key)) {
            state[key] = false;
          }
        }

        state[props.name as keyof typeof props.value] = true;
      }),
    );
  };

  return (
    <button
      type={props.type}
      class={cn("flex w-full items-center gap-4 disabled:cursor-not-allowed", {
        "flex-row-reverse": props.position === "right",
      })}
      disabled={props.disabled}
      on:click={onInputValue}
    >
      <div class="flex w-full flex-col">
        <span class="text-md w-full text-start">{props.title}</span>
        <Show when={props.description}>
          <span class="w-full text-start text-xs text-[var(--text-secondary)]">{props.description}</span>
        </Show>
      </div>
      <div class="flex aspect-square size-5 shrink-0 items-center justify-center rounded-full border border-solid border-[var(--text-primary)]">
        <Show when={props.checked} children={<span class="flex size-3 rounded-full bg-[var(--text-primary)]"></span>} />
      </div>
    </button>
  );
};

export default InputRadio;
