import { Component, Show } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import Reaction from "~/shared/components/media/reaction";
import TooltipContainer from "~/shared/containers/tooltip";
import cn from "~/utilities/cn";

interface Props {
  errorMessage: { onInput: string; message: string };
  name: string;
  setValue: SetStoreFunction<{ unicode: string; speedAnimation: number }>;
  src: string | null;
  value: { unicode: string; speedAnimation: number };
  disabled?: boolean;
}

const InputUnicode: Component<Props> = (props) => {
  const spaceNumber = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div class="flex w-full flex-col gap-1">
      <div
        class={cn(
          "flex w-full gap-2 rounded-md bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]",
          { "outline-red-600": props.errorMessage?.onInput === props.name },
        )}
      >
        <div class="aspect-square size-8 shrink-0 rounded-md bg-[var(--bg-secondary-hover)] p-1">
          <Show when={props.src}>
            <Reaction {...props.value} src={props.src!} />
          </Show>
        </div>
        <div class="flex w-full items-center rounded-md bg-[var(--bg-secondary-hover)] px-2 disabled:cursor-not-allowed disabled:text-[var(--text-secondary-hover)]">
          <input
            type="text"
            name={props.name}
            placeholder="unicode"
            value={props.value.unicode}
            class="w-full disabled:cursor-not-allowed"
            disabled={!props.src || props.disabled}
            autocomplete="off"
            maxlength={15}
            on:input={(e) => props.setValue("unicode", e.target.value)}
          />
          <span
            class={cn(
              "shrink-0 cursor-default border-l border-solid border-[var(--bg-secondary)] pl-2 text-[var(--text-secondary)]",
              { "text-red-600": props.value.unicode.trim().length >= 15 },
            )}
          >
            <TooltipContainer text={`${spaceNumber(15 - props.value.unicode.trim().length)} remaining`}>
              {spaceNumber(15 - props.value.unicode.trim().length)}
            </TooltipContainer>
          </span>
        </div>
      </div>
      <Show when={props.errorMessage?.onInput === props.name}>
        <span class="text-red-600">*{props.errorMessage?.message}</span>
      </Show>
    </div>
  );
};

export default InputUnicode;
