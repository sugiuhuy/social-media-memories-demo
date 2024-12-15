import { Component, Show, splitProps } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import cn from "~/utilities/cn";

interface Props {
  name: string;
  placeholder: string;
  setValue: SetStoreFunction<{ [key: string]: any }>;
  value: { [key: string]: any };
  class?: string;
  disabled?: boolean;
  maxlength?: number;
  errorMessage: { onInput: string; message: string };
}

const InputTextarea: Component<Props> = (props) => {
  const [_props, _other] = splitProps(props, ["name", "placeholder", "maxlength", "disabled"]);

  const onInputValue = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    props.setValue(target.name, target.value);
  };

  const spaceNumber = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div class="flex w-full flex-col gap-1">
      <div
        class={cn(
          "flex h-48 w-full flex-col rounded-md bg-[var(--bg-secondary)] outline outline-1 outline-offset-2 outline-[var(--border-secondary)] focus-within:outline-blue-600 disabled:cursor-not-allowed",
          { "outline-red-600": props.errorMessage.onInput === props.name },
          _other.class,
        )}
      >
        <textarea {..._props} value={_other.value[_props.name]} class="flex h-full w-full p-2" on:input={onInputValue} />
        <Show when={_props.maxlength}>
          <div class="flex w-full justify-end border-t border-solid border-[var(--border-secondary)] p-2">
            <span class="text-sm text-[var(--text-secondary-hover)]">
              {spaceNumber(_other.value[_props.name].trim().length)} / {spaceNumber(_props.maxlength!)}
            </span>
          </div>
        </Show>
      </div>
      <Show when={props.errorMessage.onInput === props.name}>
        <span class="text-sm text-red-600">*{props.errorMessage.message}</span>
      </Show>
    </div>
  );
};

export default InputTextarea;
