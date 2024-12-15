import { Component, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import cn from "~/utilities/cn";

interface Props {
  errorMessage: { onInput: string; message: string };
  max: number;
  name: string;
  setValue: SetStoreFunction<{ unicode: string; speedAnimation: number }>;
  value: { unicode: string; speedAnimation: number };
  disabled?: boolean;
}

const InputSpeedAnimation: Component<Props> = (props) => {
  const onIncrement = () => {
    props.setValue(
      produce((state: any) => {
        if (parseInt(state.speedAnimation) + 50 >= props.max!) state.speedAnimation = props.max!;
        else state.speedAnimation += 50;
      }),
    );
  };

  const onDecrement = () => {
    props.setValue(
      produce((state: any) => {
        if (parseInt(state.speedAnimation) - 50 < 0) state.speedAnimation = 0;
        else state.speedAnimation -= 50;
      }),
    );
  };

  return (
    <div class="flex w-full flex-col gap-1">
      <div class="mt-2 flex w-full flex-col items-end gap-2">
        <span class="text-[var(--text-secondary)]">Speed animation</span>
        <div
          class={cn(
            "flex w-full flex-col gap-2 rounded-md bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]",
            { "outline-red-600": props.errorMessage?.onInput === props.name },
          )}
        >
          <div class="flex w-full gap-2">
            <button
              type="button"
              class="group/icon aspect-square size-8 shrink-0 rounded-md bg-[var(--bg-secondary-hover)] p-2.5 disabled:cursor-not-allowed"
              disabled={props.disabled}
              on:click={onDecrement}
            >
              <Icons name="arrow" class="size-full rotate-270 group-active/icon:scale-95" />
            </button>
            <span class="flex h-8 w-full select-none items-center justify-center rounded-md bg-[var(--bg-secondary-hover)]">
              {props.value.speedAnimation}ms
            </span>
            <button
              type="button"
              class="group/icon aspect-square size-8 shrink-0 rounded-md bg-[var(--bg-secondary-hover)] p-2.5 disabled:cursor-not-allowed"
              disabled={props.disabled}
              on:click={onIncrement}
            >
              <Icons name="arrow" class="size-full rotate-90 group-active/icon:scale-95" />
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={props.max}
            step={1}
            value={props.value.speedAnimation}
            class="w-full appearance-none rounded-full bg-[var(--bg-secondary-hover)] p-1 disabled:cursor-not-allowed"
            disabled={props.disabled}
            on:input={(e) => props.setValue("speedAnimation", parseInt(e.target.value))}
          />
        </div>
      </div>
      <Show when={props.errorMessage?.onInput === props.name}>
        <span class="text-red-600">*{props.errorMessage?.message}</span>
      </Show>
    </div>
  );
};

export default InputSpeedAnimation;
