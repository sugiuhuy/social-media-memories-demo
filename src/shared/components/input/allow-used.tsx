import { Component, For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import InputRadio from "./radio";

interface Props {
  allowUsedFor: { everyone: boolean; followers: boolean };
  setAllowUsedFor: SetStoreFunction<{ everyone: boolean; followers: boolean }>;
  disabled?: boolean;
}

const RadioAllowUsed: Component<Props> = (props) => {
  const allowUsedByRadios: { name: "everyone" | "followers"; title: string }[] = [
    { name: "everyone", title: "Allow used to everyone" },
    { name: "followers", title: "Allow used only to followers" },
  ];

  return (
    <div class="flex w-full flex-col gap-4 rounded-md p-3 outline outline-1 outline-[var(--border-primary)]">
      <For each={allowUsedByRadios}>
        {(item) => (
          <InputRadio
            {...item}
            position="right"
            checked={props.allowUsedFor[item.name]}
            value={props.allowUsedFor}
            setValue={props.setAllowUsedFor}
            disabled={props.disabled}
            type="button"
          />
        )}
      </For>
    </div>
  );
};

export default RadioAllowUsed;
