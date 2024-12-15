import { Component, createEffect, createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Icons from "~/assets/icons";
import { selectStore } from "~/stores/manage";
import { AuthProps } from "~/types/user-interfaces";
import cn from "~/utilities/cn";
import Avatar from "../components/media/avatar";
import SidebarNavigate from "../components/navigate/sidebar";
import PopupCreatePost from "../components/popup/create-post";
import DropdownContainer from "../containers/dropdown";
import PopupContainer from "../containers/popup";
import SidebarDropdownAppearance from "./sidebar-dropdown-appearance";
import SidebarDropdownMenu from "./sidebar-dropdown-menu";

const Sidebar: Component<AuthProps> = (props) => {
  const theme = selectStore((store) => store.theme);

  const [open, setOpen] = createStore<{ isOpenDropdownMenu: boolean; isOpenPopupNewPost: boolean }>({
    isOpenDropdownMenu: false,
    isOpenPopupNewPost: false,
  });

  const [isDarkMode, setIsDarkMode] = createSignal<boolean>(true);
  const [tab, setTab] = createSignal<number>(0);

  const onDropdownMenu = (value: boolean) => setOpen("isOpenDropdownMenu", value);
  const onPopupNewPost = (value: boolean) => setOpen("isOpenPopupNewPost", value);

  createEffect(() => {
    if (open.isOpenDropdownMenu) {
      setTab(0);
    }
  });

  createEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mediaQuery.matches ? "dark" : "light";

    if (theme()) {
      setIsDarkMode(theme() === "auto" && systemTheme === "dark" ? true : theme() === "dark" ? true : false);
    }
  });

  return (
    <>
      <div class="sticky left-0 top-0 z-[999] h-dvh border-r border-solid border-[var(--border-primary)] max-md:hidden">
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-center p-2">
            <a href="/" class="flex shrink-0 items-center gap-2.5 rounded-lg p-3 hover:bg-[var(--bg-secondary)]">
              <Icons name="logo" class="aspect-square size-6 shrink-0" />
              <span class="min-w-32 shrink-0 max-xl:hidden">{import.meta.env.VITE_APP_NAME}</span>
            </a>
          </div>
          <div class="flex h-full flex-col items-center justify-center gap-2 p-2">
            <SidebarNavigate href="/" icon="home" placeholder="Home" />
            <SidebarNavigate href="/explore" icon="compass" placeholder="Explore" />
            <SidebarNavigate
              href="/activities"
              icon="notification"
              placeholder="Activities"
              count={props.countUnreadNotifications}
            />
            <SidebarNavigate href="/chat" icon="paperPlane" placeholder="Messages" count={props.countUnreadChatMessages} />
            <button
              class="flex shrink-0 items-center gap-2.5 rounded-lg p-3 hover:bg-[var(--border-primary)]"
              on:click={() => onPopupNewPost(true)}
            >
              <Icons name="addNew" class="aspect-square size-6 shrink-0" />
              <span class="flex min-w-32 shrink-0 max-xl:hidden">Add memories</span>
            </button>
            <SidebarNavigate href={`/@${props.username}`} placeholder="Profile">
              <Avatar {...props} class="aspect-square size-6 shrink-0 rounded-full text-base" />
            </SidebarNavigate>
          </div>
          <div class="flex items-center justify-center p-2">
            <DropdownContainer when={open.isOpenDropdownMenu} onClose={() => onDropdownMenu(false)}>
              <button
                class={cn("flex shrink-0 items-center gap-2.5 rounded-lg p-3 hover:bg-[var(--bg-secondary)]", {
                  "bg-[var(--bg-secondary)]": open.isOpenDropdownMenu,
                })}
                on:click={() => onDropdownMenu(!open.isOpenDropdownMenu)}
              >
                <Icons name="options" typeOptions="3 line" class="aspect-square size-6 shrink-0" />
                <span class="flex min-w-32 shrink-0 max-xl:hidden">More</span>
              </button>
              <div
                class={cn(
                  "pointer-events-none absolute bottom-[100%] left-0 z-[1] flex w-72 origin-bottom-left flex-col divide-y divide-solid divide-[var(--border-secondary)] rounded-md bg-[var(--bg-secondary)] opacity-0 outline outline-1 outline-[var(--border-secondary)] transition-[bottom,opacity]",
                  { "pointer-events-auto bottom-[calc(100%+0.5rem)] opacity-100": open.isOpenDropdownMenu },
                )}
              >
                <Show
                  when={tab() === 0}
                  fallback={<SidebarDropdownAppearance isDarkMode={isDarkMode()} setTab={setTab} theme={theme()} />}
                >
                  <SidebarDropdownMenu {...props} isDarkMode={isDarkMode()} setTab={setTab} />
                </Show>
              </div>
            </DropdownContainer>
          </div>
        </div>
      </div>
      <PopupContainer when={open.isOpenPopupNewPost}>
        <PopupCreatePost onClose={() => onPopupNewPost(false)} />
      </PopupContainer>
    </>
  );
};

export default Sidebar;
