import { Component, Show } from "solid-js";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import { ProfileProps } from "~/types/user-interfaces";
import Avatar from "../media/avatar";

const CardProfileAvatar: Component<ProfileProps> = (props) => {
  return (
    <div class="flex w-full max-w-md items-center gap-2">
      <div class="flex w-full max-w-full flex-col overflow-hidden">
        <div class="flex items-center">
          <div class="inline-flex w-full max-w-full items-center overflow-hidden whitespace-nowrap">
            <span class="truncate text-3xl max-md:text-2xl">{props.name}</span>
            <Show when={props.isVerified}>
              <TooltipContainer text="Account is verified" class="ml-1 mt-1 flex">
                <Icons name="verified" class="aspect-square size-5 shrink-0 max-md:size-4" />
              </TooltipContainer>
            </Show>
          </div>
        </div>
        <div class="inline-flex w-full max-w-full items-center overflow-hidden whitespace-nowrap">
          <span class="truncate text-sm leading-5 text-[var(--text-secondary-hover)]">@{props.username}</span>
        </div>
      </div>
      <Avatar {...props} class="size-28 shrink-0 rounded-full text-7xl max-xl:size-24 max-md:size-20 max-md:text-5xl" />
    </div>
  );
};

export default CardProfileAvatar;
