import { useParams } from "@solidjs/router";
import { Component, createSignal, For, Show } from "solid-js";
import Icons from "~/assets/icons";
import PopupContainer from "~/shared/containers/popup";
import { mutateStore, selectStore } from "~/stores/manage";
import { PostProps } from "~/types/post-interfaces";
import { formatNumber } from "~/utilities/format/number";
import ButtonReactPost from "../button/react-post";
import PopupAuthorCollections from "../popup/author-collections";

const CardPostActions: Component<PostProps> = (props) => {
  const params: { post: string } = useParams();

  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();
  const isAuthor = auth()._id === props.author._id;

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const onClick = () => mutate("post", props);

  return (
    <>
      <div class="flex w-full flex-wrap gap-3">
        <For each={props.collections}>
          {(reaction) => (
            <Show
              when={
                reaction.countUsed > 0 &&
                ((!isAuthor && reaction.allowUsedFor.followers && props.author.isFollow) ||
                  reaction.allowUsedFor.everyone ||
                  isAuthor)
              }
            >
              <ButtonReactPost {...reaction} collectionId={reaction._id} postId={props._id}>
                <span class="font-semibold text-[var(--text-primary)]">{formatNumber(reaction.countUsed)}</span>
              </ButtonReactPost>
            </Show>
          )}
        </For>
        <Show when={props.collections.length > 0}>
          <button class="group/icon flex items-center gap-1.5 rounded-full" on:click={() => setIsOpen(true)}>
            <Icons
              name="gallery"
              typeGallery="reaction"
              class="aspect-square size-5 shrink-0 group-hover/icon:text-[var(--text-secondary)] group-active/icon:scale-95"
            />
          </button>
        </Show>
        <Show when={!params.post}>
          <a href={`/post/${props._id}`} class="group/icon flex items-center gap-1.5 rounded-full" on:click={onClick}>
            <Icons
              name="comment"
              class="aspect-square size-5 shrink-0 group-hover/icon:text-[var(--text-secondary)] group-active/icon:scale-95"
            />
            <span class="group-hover/icon:text-[var(--text-secondary)]">{formatNumber(props.countComments)}</span>
          </a>
        </Show>
      </div>
      <PopupContainer when={isOpen()}>
        <PopupAuthorCollections {...props} onClose={() => setIsOpen(false)} />
      </PopupContainer>
    </>
  );
};

export default CardPostActions;
