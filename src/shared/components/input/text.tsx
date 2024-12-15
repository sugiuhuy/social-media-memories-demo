import { Component, createSignal, Show, splitProps } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import cn from "~/utilities/cn";

interface Props {
  messageError: { onInput: string; message: string };
  name: string;
  placeholder: string;
  setValue: SetStoreFunction<{ [key: string]: any }>;
  type: "text" | "password";
  value: { [key: string]: any };
  disabled?: boolean;
  maxlength?: number;
}

const InputText: Component<Props> = (props) => {
  const [_props, _other] = splitProps(props, ["name", "disabled", "maxlength", "placeholder"]);
  const [isShowPassword, setIsShowPassword] = createSignal<boolean>(false);
  const spaceNumber = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div class="flex w-full flex-col">
      <div
        class={cn(
          "flex w-full items-center rounded-md bg-[var(--bg-secondary)] outline outline-1 outline-offset-2 outline-[var(--border-secondary)] focus-within:outline-blue-600",
          { "outline-red-600": _other.messageError?.onInput === _props.name },
        )}
      >
        <label class="relative flex h-10 w-full items-center overflow-hidden">
          <input
            type={_other.type === "password" && isShowPassword() ? "text" : _other.type}
            name={_props.name}
            value={_other.value[_props.name]}
            maxlength={props.maxlength}
            class={cn(
              "text-var(--text-prymary) w-full text-ellipsis bg-transparent p-[9px_8px_7px_8px] align-middle text-base disabled:text-[var(--text-secondary-hover)]",
              { "p-[14px_8px_2px_8px] text-xs": _other.value[_props.name].trim().length > 0 },
            )}
            autocomplete="off"
            disabled={_props.disabled}
            on:input={(e) => _other.setValue(_props.name, e.target.value)}
          />
          <span
            class={cn(
              "pointer-events-none absolute left-2 origin-left translate-y-0 scale-100 text-ellipsis text-xs text-[var(--text-secondary-hover)] transition-transform ease-out",
              { "translate-y-[-10px] scale-[calc(10_/_12)]": _other.value[_props.name].trim().length > 0 },
            )}
          >
            {_props.placeholder}
          </span>
          <Show when={props.maxlength}>
            <span
              class={cn(
                "mr-2 shrink-0 cursor-default border-l border-solid border-[var(--border-secondary)] pl-2 text-[var(--text-secondary)]",
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
        </label>
        <Show when={_other.type === "password"}>
          <button
            type="button"
            class="text-var(--text-prymary) aspect-square shrink-0 p-2 disabled:text-[var(--text-secondary-hover)]"
            disabled={_props.disabled}
            on:click={() => setIsShowPassword(!isShowPassword())}
          >
            <TooltipContainer text={isShowPassword() ? "Password is showing" : "Password are hidden"}>
              <Icons name="eye" isActive={isShowPassword()} class="size-5" />
            </TooltipContainer>
          </button>
        </Show>
      </div>
      <Show when={_other.messageError?.onInput === _props.name}>
        <span class="mt-1 text-sm text-red-600">*{_other.messageError?.message}</span>
      </Show>
    </div>
  );
};

export default InputText;
