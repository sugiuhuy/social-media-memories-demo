import { RouteSectionProps } from "@solidjs/router";
import { Component, Match, onMount, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ShowProfileSuggestions from "~/shared/common/show-profile-suggestions";
import ButtonBack from "~/shared/components/button/back";
import ButtonProfileActions from "~/shared/components/button/profile-actions";
import CardProfileAvatar from "~/shared/components/card/profile-avatar";
import CardProfileBio from "~/shared/components/card/profile-bio";
import CardProfileCounter from "~/shared/components/card/profile-counter";
import CardUser from "~/shared/components/card/user";
import ProfileNavigate from "~/shared/components/navigate/profile";
import HeaderContainer from "~/shared/containers/header";
import { mutateStore, selectStore } from "~/stores/manage";

const ProfileLayout: Component<RouteSectionProps> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const profile = selectStore((store) => store.profile!);
  const mutate = mutateStore();

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  onMount(() => {
    document.title = profile().name;
  });

  return (
    <>
      <HeaderContainer class="flex w-full items-center gap-3 p-2 md:hidden">
        <ButtonBack class="group/navigator flex">
          <Icons name="arrow" class="aspect-square size-4 shrink-0 rotate-270 group-active/navigator:scale-95" />
        </ButtonBack>
        <div class="flex w-full items-center gap-2">
          <CardUser {...profile()} avatarSize="medium" />
          <Switch>
            <Match when={profile()._id === auth()._id}>
              <a href="/account" class="group/icon aspect-square size-6 shrink-0">
                <Icons name="setting" class="size-5" />
              </a>
            </Match>
            <Match when={profile()._id !== auth()._id}>
              <button
                class="group/icon aspect-square size-5 shrink-0"
                on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
              >
                <Icons name="options" typeOptions="3 dot horizontal" class="group-active/icon:scale-95" />
              </button>
            </Match>
          </Switch>
        </div>
      </HeaderContainer>
      <div class="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
        <CardProfileAvatar {...profile()} />
        <CardProfileBio {...profile()} />
        <CardProfileCounter {...profile()} />
        <ButtonProfileActions {...profile()} />
        <Show when={profile()._id !== auth()._id && profile().showSuggestions}>
          <ShowProfileSuggestions suggestions={profile().suggestions} />
        </Show>
        <div class="inline-flex w-full max-w-md items-center">
          <ProfileNavigate href={`/@${profile().username}`}>
            <Icons name="gallery" typeGallery="all" class="aspect-square size-5 shrink-0 md:size-4" />
            <span class="max-md:hidden">Memories</span>
          </ProfileNavigate>
          <ProfileNavigate href={`/@${profile().username}/tagged`}>
            <Icons name="user" typeUser="tagged" class="aspect-square size-5 shrink-0 md:size-4" />
            <span class="max-md:hidden">Tagged</span>
          </ProfileNavigate>
          <ProfileNavigate href={`/@${profile().username}/saved`}>
            <Icons name="bookmark" class="aspect-square size-5 shrink-0 md:size-4" />
            <span class="max-md:hidden">Saved</span>
          </ProfileNavigate>
        </div>
        <div class="flex h-full w-full max-w-md flex-col gap-3">{props.children}</div>
      </div>
    </>
  );
};

export default ProfileLayout;
