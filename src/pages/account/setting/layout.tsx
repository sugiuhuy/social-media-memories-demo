import { Navigate, RouteSectionProps, useMatch } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import Icons from "~/assets/icons";
import Navbar from "~/shared/common/navbar";
import SettingMenus from "~/shared/common/setting-menus";
import ButtonBack from "~/shared/components/button/back";
import HeaderContainer from "~/shared/containers/header";
import { selectStore } from "~/stores/manage";

const SettingLayout: Component<RouteSectionProps> = (props) => {
  const match = useMatch(() => "/account");
  const auth = selectStore((store) => store.auth);
  const appearUrls = selectStore((store) => store.appearUrls);

  return (
    <Show when={auth()} fallback={<Navigate href="/accout/login" />}>
      <HeaderContainer class="flex w-full items-center justify-between p-2 md:hidden">
        <ButtonBack class="group/icon shrink-0 p-1">
          <Icons name="arrow" class="aspect-square size-4 rotate-270 group-active/icon:scale-95" />
        </ButtonBack>
        <span id="page-title" class="shrink-0 text-lg capitalize">
          Settings
        </span>
        <div class="flex size-6"></div>
      </HeaderContainer>
      <div class="flex h-full w-full divide-x divide-solid divide-[var(--border-primary)]">
        <div
          class={`top-0 w-full flex-col border-r border-solid border-[var(--border-primary)] md:sticky md:h-dvh md:w-60 md:shrink-0 md:overflow-hidden ${
            Boolean(match()) ? "flex" : "flex max-md:hidden"
          }`}
        >
          <div class="flex h-full w-full flex-col md:overflow-auto">
            <SettingMenus />
          </div>
        </div>
        <div
          class={`flex w-full flex-col items-center divide-y divide-solid divide-[var(--border-primary)] ${
            Boolean(match()) ? "flex max-md:hidden" : "flex"
          }`}
        >
          <div class="flex h-full w-full flex-col items-center gap-2 p-2">
            <span id="page-title" class="mb-2 mt-4 w-full max-w-md text-4xl max-md:hidden">
              Settings
            </span>
            <div class="flex h-full w-full max-w-md flex-col gap-2">
              <span class="w-full rounded-md bg-red-600 p-2 text-center">
                Please note that some data cannot be changed and blocked, muted or personalized accounts cannot be displayed in
                the demo version
              </span>
              {props.children}
            </div>
            <div class="mt-10 flex w-full flex-col items-center max-md:hidden">
              <Show when={appearUrls().filter((i) => i.appearAt.footerNavigation).length > 0}>
                <div class="flex w-full flex-wrap justify-center gap-3">
                  <For each={appearUrls().filter((i) => i.appearAt.footerNavigation)}>
                    {(item) => (
                      <a href={item.url} class="text-center text-sm text-blue-600 active:text-blue-700">
                        {item.title}
                      </a>
                    )}
                  </For>
                </div>
              </Show>
              <span class="select-none text-center text-sm text-[var(--text-secondary)]">
                &#169; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Navbar {...auth()!} />
    </Show>
  );
};

export default SettingLayout;
