import { Component, createSignal, onMount, Show } from "solid-js";
import Icons from "~/assets/icons";
import ShowComments from "~/shared/common/show-comments";
import ButtonBack from "~/shared/components/button/back";
import ButtonSortComments from "~/shared/components/button/sort-comments";
import CardPostActions from "~/shared/components/card/post-actions";
import CardPostAuthor from "~/shared/components/card/post-author";
import CardPostContent from "~/shared/components/card/post-content";
import CardPostMedia from "~/shared/components/card/post-media";
import CardReplyingComment from "~/shared/components/card/replying-comment";
import InputPostComment from "~/shared/components/input/post-comment";
import HeaderContainer from "~/shared/containers/header";
import NavbarContainer from "~/shared/containers/navbar";
import { selectStore } from "~/stores/manage";
import { CommentProps } from "~/types/post-interfaces";
import { formatNumber } from "~/utilities/format/number";

const PagePostDetails: Component = () => {
  const post = selectStore((store) => store.post!);

  const [replying, setReplying] = createSignal<CommentProps | null>(null);
  const [sortComments, setSortComments] = createSignal<"trending" | "new">("new");

  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - ${post().getText}`;
  });

  return (
    <div class="flex h-full w-full items-center justify-center">
      <div class="flex h-[540px] w-full justify-center gap-2 max-md:h-full">
        <CardPostMedia
          class="flex h-full w-full max-w-md rounded-lg bg-[var(--bg-secondary)] max-md:hidden"
          media={post().media}
        />
        <div class="flex h-full w-full flex-col divide-y divide-solid divide-[var(--border-primary)] md:max-w-96 md:overflow-hidden">
          <HeaderContainer class="flex w-full items-center gap-3 p-2 md:pt-0">
            <ButtonBack class="group/navigator flex md:hidden">
              <Icons name="arrow" class="aspect-square size-4 shrink-0 rotate-270 group-active/navigator:scale-95" />
            </ButtonBack>
            <CardPostAuthor {...post()} />
          </HeaderContainer>
          <div class="flex h-full w-full flex-col gap-2 p-2 md:overflow-y-auto">
            <CardPostMedia
              class="flex h-[450px] w-full justify-center rounded-lg bg-[var(--bg-secondary)] md:hidden md:h-[525px]"
              media={post().media}
            />
            <CardPostContent {...post()} noTruncate />
            <CardPostActions {...post()} />
            <div class="mt-2 flex h-full w-full flex-col gap-1 divide-y divide-solid divide-[var(--border-secondary)]">
              <div class="flex w-full items-center justify-between">
                <ButtonSortComments setSortComments={setSortComments} sortComments={sortComments()} />
                <span class="text-[var(--text-secondary)]">{formatNumber(post().countComments)} comments</span>
              </div>
              <div class="flex h-full min-h-28 w-full flex-col gap-3 pt-1">
                <ShowComments maxComments={post().countComments} postId={post()._id} setReplyingComment={setReplying} />
              </div>
            </div>
          </div>
          <NavbarContainer class="flex w-full flex-col gap-2 px-2 pb-2 pt-2 md:px-0 md:pb-0">
            <InputPostComment postId={post()._id}>
              <Show when={replying()}>
                <CardReplyingComment {...replying()!}>
                  <button
                    class="group/icon mt-1 flex h-fit shrink-0 rounded-lg bg-red-600 p-1.5 active:bg-red-700"
                    on:click={() => setReplying(null)}
                  >
                    <Icons name="trash" class="aspect-square size-3 shrink-0 group-active/icon:scale-95" />
                  </button>
                </CardReplyingComment>
              </Show>
            </InputPostComment>
          </NavbarContainer>
        </div>
      </div>
    </div>
  );
};

export default PagePostDetails;
