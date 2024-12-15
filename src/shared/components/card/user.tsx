import { ParentComponent, Show, splitProps } from "solid-js";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import { UserProps } from "~/types/user-interfaces";
import cn from "~/utilities/cn";
import Avatar from "../media/avatar";

interface Props extends UserProps {
  avatarSize: "small" | "medium" | "large";
  isNavigate?: boolean;
}

const CardUser: ParentComponent<Props> = (props) => {
  const [_other, _props] = splitProps(props, ["avatarSize", "children", "isNavigate"]);

  return (
    <>
      <Avatar
        avatar={_props.avatar}
        display={_props.display}
        class={cn("size-14 rounded-full text-4xl", {
          "size-10 text-xl": _other.avatarSize === "small",
          "size-12 text-2xl": _other.avatarSize === "medium",
        })}
      />
      <div class="flex w-full max-w-full flex-col overflow-hidden">
        <div class="flex items-center">
          <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
            <Show when={_other.isNavigate} fallback={<span class="truncate">{_props.name}</span>}>
              <a href={`/@${_props.username}`} class="truncate text-blue-600 active:text-blue-700">
                {_props.name}
              </a>
            </Show>
            <Show when={_props.isVerified}>
              <TooltipContainer text="Account is verified" class="ml-1 flex">
                <Icons name="verified" class="aspect-square size-4 shrink-0" />
              </TooltipContainer>
            </Show>
          </div>
        </div>
        <div class="inline-flex max-w-full items-center gap-2 overflow-hidden whitespace-nowrap">
          <Show
            when={_other.children}
            fallback={<span class="truncate text-xs text-[var(--text-secondary-hover)]">@{_props.username}</span>}
          >
            {_other.children}
          </Show>
        </div>
      </div>
    </>
  );
};

export default CardUser;
