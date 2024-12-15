import { Navigate, RouteSectionProps, useMatch } from "@solidjs/router";
import { Component, onMount, Show } from "solid-js";
import { generateSearchUsers } from "~/libraries/user-data";
import AppearUrls from "~/shared/common/appear-urls";
import ShowSuggestions from "~/shared/common/show-suggestions";
import Sidebar from "~/shared/common/sidebar";
import CardUser from "~/shared/components/card/user";
import { mutateStore, selectStore } from "~/stores/manage";

const Protected: Component<RouteSectionProps> = (props) => {
  const matchPostPath = useMatch(() => "/post/*?");
  const matchChatPath = useMatch(() => "/chat/*?");
  const matchAccountSettingPath = useMatch(() => "/account/*?");

  const auth = selectStore((store) => store.auth);
  const mutate = mutateStore();

  onMount(() => {
    mutate("userSuggestions", generateSearchUsers({ count: 7, isAction: false, haveRequestFollow: false }));
  });

  return (
    <Show when={auth()} fallback={<Navigate href="/account/login" />}>
      <Sidebar {...auth()!} />
      <div class="flex w-full flex-col items-center">{props.children}</div>
      <Show when={!Boolean(matchAccountSettingPath()) && !Boolean(matchChatPath()) && !Boolean(matchPostPath()) && auth()}>
        <div class="relative flex w-full max-w-80 shrink-0 flex-col gap-2 p-2 max-lg:hidden">
          <div class="flex w-full items-center gap-2 rounded-lg bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]">
            <CardUser {...auth()!} avatarSize="small" isNavigate />
          </div>
          <ShowSuggestions />
          <div class="sticky top-2 mt-4 flex w-full flex-col items-center">
            <AppearUrls />
            <span class="select-none text-center text-sm text-[var(--text-secondary)]">
              &#169; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
            </span>
          </div>
        </div>
      </Show>
    </Show>
  );
};

export default Protected;
