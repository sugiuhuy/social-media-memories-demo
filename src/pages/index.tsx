import { Component, onMount, Show } from "solid-js";
import Icons from "~/assets/icons";
import Navbar from "~/shared/common/navbar";
import ShowPosts from "~/shared/common/show-posts";
import HeaderContainer from "~/shared/containers/header";
import { selectStore } from "~/stores/manage";

const PageHome: Component = () => {
  const auth = selectStore((store) => store.auth!);

  onMount(() => {
    document.title = import.meta.env.VITE_APP_NAME;
  });

  return (
    <>
      <HeaderContainer class="flex w-full items-center justify-between p-4 md:hidden">
        <a href="/chat" class="group/icon relative shrink-0">
          <Icons name="paperPlane" class="size-5 shrink-0 group-active/icon:scale-95" />
          <Show when={auth().countUnreadChatMessages > 0}>
            <div class="absolute -right-1 -top-1 flex size-3 items-center justify-center">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
            </div>
          </Show>
        </a>
        <a href="/" class="group/icon shrink-0">
          <Icons name="logo" class="size-7 shrink-0 group-active/icon:scale-95" />
        </a>
        <a href="/account" class="group/icon shrink-0">
          <Icons name="setting" class="size-5 shrink-0 group-active/icon:scale-95" />
        </a>
      </HeaderContainer>
      <ShowPosts />
      <Navbar {...auth()} />
    </>
  );
};

export default PageHome;
