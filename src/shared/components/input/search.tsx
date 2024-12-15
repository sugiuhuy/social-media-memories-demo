import { Scheduled } from "@solid-primitives/scheduled";
import { Component, createSignal, createUniqueId, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import Icons from "~/assets/icons";

interface Props {
  class: string;
  onDebounced: Scheduled<[value: string]>;
  placeholder: string;
  disabled?: boolean;
}

const InputSearch: Component<Props> = (props) => {
  const id = createUniqueId();
  const [value, setValue] = createSignal<string>("");

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    props.onDebounced(target.value);
  };

  const onClear = () => {
    setValue("");
    props.onDebounced("");
  };

  return (
    <div class={twMerge("flex w-full items-center", props.class)}>
      <Icons name="search" isVisited={value().trim().length > 0} class="flex aspect-square size-4 shrink-0" />
      <input
        type="text"
        id={id}
        name={id}
        value={value()}
        class="flex w-full pl-2"
        placeholder={props.placeholder}
        autocomplete="off"
        on:input={onInput}
      />
      <Show when={value().trim().length}>
        <button type="button" class="ml-1 shrink-0 rounded-full bg-[var(--bg-primary)] p-2" on:click={onClear}>
          <Icons name="cross" class="aspect-square size-2 rotate-45" />
        </button>
      </Show>
    </div>
  );
};

export default InputSearch;
