import { RouteSectionProps } from "@solidjs/router";
import { Component, createEffect, For, onCleanup, Show } from "solid-js";
import Icons from "~/assets/icons";
import { generateProfile } from "~/libraries/user-data";
import Navbar from "~/shared/common/navbar";
import ButtonBack from "~/shared/components/button/back";
import Spinner from "~/shared/components/media/spinner";
import HeaderContainer from "~/shared/containers/header";
import { mutateStore, selectStore } from "~/stores/manage";

const LoadProfileData: Component<RouteSectionProps> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const profile = selectStore((store) => store.profile);
  const mutate = mutateStore();

  onCleanup(() => mutate("profile", null));
  createEffect(() => {
    if (props.params.username) {
      const prof = generateProfile({ countSuggestions: 10, username: props.params.username.replace("@", "") });
      mutate("profile", null);

      if (auth().username === props.params.username.replace("@", "")) mutate("profile", { ...prof, ...auth() });
      else mutate("profile", prof);
    }
  });

  return (
    <>
      <Show
        when={profile()}
        fallback={
          <>
            <HeaderContainer class="flex w-full items-center gap-3 p-2 md:hidden">
              <ButtonBack class="group/navigator flex">
                <Icons name="arrow" class="aspect-square size-4 shrink-0 rotate-270 group-active/navigator:scale-95" />
              </ButtonBack>
              <div class="flex w-full animate-pulse items-center gap-3">
                <div class="flex aspect-square size-12 shrink-0 rounded-full bg-[var(--bg-secondary)]"></div>
                <div class="flex w-full flex-col gap-2">
                  <div class="flex h-4 w-3/4 rounded-full bg-[var(--bg-secondary)]"></div>
                  <div class="flex h-4 w-1/2 rounded-full bg-[var(--bg-secondary)]"></div>
                </div>
                <div class="flex aspect-square size-7 shrink-0 rounded-full bg-[var(--bg-secondary)]"></div>
              </div>
            </HeaderContainer>
            <div class="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
              <div class="flex w-full max-w-md items-center gap-2">
                <div class="flex w-full flex-col justify-center gap-2">
                  <span class="h-6 w-3/4 animate-pulse rounded-full bg-[var(--bg-secondary)]" />
                  <span class="h-4 w-1/2 animate-pulse rounded-full bg-[var(--bg-secondary)]" />
                </div>
                <div class="size-28 shrink-0 animate-pulse rounded-full bg-[var(--bg-secondary)] max-xl:size-24 max-md:size-20" />
              </div>
              <div class="grid w-full max-w-md animate-pulse grid-cols-3 gap-1">
                <div class="col-span-1 h-3.5 rounded-full bg-[var(--bg-secondary)]"></div>
                <div class="col-span-2 h-3.5 rounded-full bg-[var(--bg-secondary)]"></div>
                <div class="col-span-3 h-3.5 rounded-full bg-[var(--bg-secondary)]"></div>
              </div>
              <div class="inline-flex w-full max-w-md items-center justify-between gap-2">
                <div class="inline-flex items-center gap-2">
                  <For each={[0, 1, 2]}>
                    {() => <span class="h-4 w-20 animate-pulse rounded-full bg-[var(--bg-secondary)]" />}
                  </For>
                </div>
                <div class="aspect-square size-6 shrink-0 animate-pulse rounded-full bg-[var(--bg-secondary)]" />
              </div>
              <div class="inline-flex w-full max-w-md items-center border-b border-solid border-[var(--border-primary)]">
                <For each={[0, 1, 2]}>
                  {() => (
                    <div class="inline-flex w-full items-center justify-center gap-2 p-2">
                      <div class="size-5 shrink-0 animate-pulse rounded-full bg-[var(--bg-secondary)] md:size-4" />
                      <span class="h-4 w-1/2 animate-pulse rounded-full bg-[var(--bg-secondary)] max-md:hidden" />
                    </div>
                  )}
                </For>
              </div>
              <div class="flex h-full w-full max-w-md flex-col items-center justify-center gap-3">
                <Spinner />
              </div>
            </div>
          </>
        }
      >
        {props.children}
      </Show>
      <Navbar {...auth()} />
    </>
  );
};

export default LoadProfileData;
