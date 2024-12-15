import { Component } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import cn from "~/utilities/cn";

interface Props {
  name: string;
  setValue: SetStoreFunction<{ [key: string]: any }>;
  value: { [key: string]: any };
  disabled?: boolean;
  type?: "submit" | "button";
}

const InputSwitcher: Component<Props> = (props) => {
  const onInputValue = () => {
    if (props.disabled) return;
    props.setValue(
      produce((state: any) => {
        state[props.name as keyof typeof props.value] = !props.value[props.name];
      }),
    );
  };

  return (
    <button
      type={props.type}
      class={cn("relative flex h-6 w-11 shrink-0 items-center rounded-full bg-[var(--text-primary)]", {
        "bg-blue-600": props.value[props.name],
      })}
      disabled={props.disabled}
      on:click={onInputValue}
    >
      <span
        class={cn("absolute left-0.5 flex size-5 rounded-full bg-[var(--bg-primary)] transition-[left]", {
          "left-[calc(100%-1.4rem)] bg-neutral-50": props.value[props.name],
        })}
      ></span>
    </button>
  );
};

export default InputSwitcher;
