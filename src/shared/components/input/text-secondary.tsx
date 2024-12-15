import { Component, createSignal, Show } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import cn from "~/utilities/cn";

interface Props {
  type: "text" | "password";
  name: string;
  value: { [key: string]: any };
  setValue: SetStoreFunction<{ [key: string]: any }>;
  errorMessage: { onInput: string; message: string };
  disabled?: boolean;
  maxlength?: number;
  placeholder?: string;
}

const InputTextSecondary: Component<Props> = (props) => {
  const [isShowPassword, setIsShowPassword] = createSignal<boolean>(false);
  const spaceNumber = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div class="flex w-full flex-col gap-1">
      <div
        class={cn(
          "flex w-full gap-2 rounded-md bg-[var(--bg-secondary)] p-2 outline outline-1 outline-offset-2 outline-[var(--border-secondary)] focus-within:outline-blue-600",
          { "outline-red-600": props.errorMessage.onInput === props.name },
        )}
      >
        <input
          type={props.type === "password" && isShowPassword() ? "text" : props.type}
          name={props.name}
          value={props.value[props.name]}
          placeholder={props.placeholder}
          class="flex w-full disabled:cursor-not-allowed"
          autocomplete="off"
          maxlength={props.maxlength}
          disabled={props.disabled}
          on:input={(e) => props.setValue(props.name, e.target.value)}
        />
        <Show when={props.maxlength}>
          <span
            class={cn(
              "shrink-0 cursor-default border-l border-solid border-[var(--border-secondary)] pl-2 text-[var(--text-secondary)]",
              {
                "mr-2": props.type === "password",
                "text-red-600": props.value[props.name].trim().length >= props.maxlength!,
              },
            )}
          >
            <TooltipContainer text={`${spaceNumber(props.maxlength! - props.value[props.name].trim().length)} remaining`}>
              {spaceNumber(props.maxlength! - props.value[props.name].trim().length)}
            </TooltipContainer>
          </span>
        </Show>
        <Show when={props.type === "password"}>
          <button
            type="button"
            class="text-var(--text-prymary) aspect-square shrink-0 disabled:text-[var(--text-secondary-hover)]"
            disabled={props.disabled}
            on:click={() => setIsShowPassword(!isShowPassword())}
          >
            <TooltipContainer text={isShowPassword() ? "Password is showing" : "Password are hidden"}>
              <Icons name="eye" isActive={isShowPassword()} class="size-5" />
            </TooltipContainer>
          </button>
        </Show>
      </div>
      <Show when={props.errorMessage.onInput === props.name}>
        <span class="text-sm text-red-600">*{props.errorMessage.message}</span>
      </Show>
    </div>
  );
};

export default InputTextSecondary;
