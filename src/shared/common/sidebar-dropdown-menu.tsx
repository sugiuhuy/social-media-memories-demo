import { Component, Setter, Show } from "solid-js";
import Icons from "~/assets/icons";
import { UserProps } from "~/types/user-interfaces";
import ButtonLogout from "../components/button/logout";
import Avatar from "../components/media/avatar";
import TooltipContainer from "../containers/tooltip";

const SidebarDropdownMenu: Component<UserProps<{ isDarkMode: boolean; setTab: Setter<number> }>> = (props) => {
  return (
    <>
      <div class="flex w-full flex-col gap-2 p-2">
        <a href={`/@${props.username}`} class="flex items-center gap-3 rounded-lg p-3 hover:bg-[var(--bg-secondary-hover)]">
          <Avatar avatar={props.avatar} display={props.display} class="size-6 rounded-full text-base" />
          <div class="flex max-w-full items-center gap-1 overflow-hidden">
            <span class="truncate capitalize">{props.name}</span>
            <Show when={props.isVerified}>
              <TooltipContainer text="Account is verified">
                <Icons name="verified" class="aspect-square size-4" />
              </TooltipContainer>
            </Show>
          </div>
        </a>
      </div>
      <div class="flex w-full flex-col gap-1 p-2">
        <a href="/account" class="flex items-center gap-3 rounded-lg p-3 hover:bg-[var(--bg-secondary-hover)]">
          <Icons name="setting" class="aspect-square size-5 shrink-0" />
          <span class="capitalize">Settings</span>
        </a>
        <button
          class="flex items-center gap-3 rounded-lg p-3 hover:bg-[var(--bg-secondary-hover)]"
          on:click={() => props.setTab(1)}
        >
          <Icons name="theme" isDarkMode={props.isDarkMode} class="aspect-square size-5 shrink-0" />
          <span class="capitalize">Appearance</span>
        </button>
      </div>
      <div class="flex w-full flex-col gap-2 p-2">
        <ButtonLogout>
          <Icons name="logout" class="aspect-square size-5 shrink-0" />
          <span class="capitalize">Logout</span>
        </ButtonLogout>
      </div>
    </>
  );
};

export default SidebarDropdownMenu;
