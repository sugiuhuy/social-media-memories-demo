import { Component, For, Show } from "solid-js";
import Icons from "~/assets/icons";
import ModalContainer from "~/shared/containers/modal";
import { selectStore } from "~/stores/manage";
import { PostProps } from "~/types/post-interfaces";
import ButtonReactPost from "../button/react-post";

interface Props extends PostProps {
  onClose: () => void;
}

const PopupAuthorCollections: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const isAuthor = auth()._id === props.author._id;

  return (
    <ModalContainer class="flex h-full max-h-sm w-full max-w-80 animate-zoom-out flex-col" onClose={props.onClose}>
      <div class="flex w-full items-center p-3">
        <div class="flex w-full"></div>
        <div class="flex shrink-0 justify-center">Reactions</div>
        <div class="flex w-full justify-end">
          <button class="group/icon flex" on:click={props.onClose}>
            <Icons
              name="cross"
              class="aspect-square size-4 shrink-0 rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)]"
            />
          </button>
        </div>
      </div>
      <div class="flex h-full w-full overflow-hidden p-3">
        <div class="flex h-full w-full flex-wrap overflow-auto">
          <For each={props.collections}>
            {(reaction) => (
              <Show
                when={
                  (!isAuthor && reaction.allowUsedFor.followers && props.author.isFollow) ||
                  reaction.allowUsedFor.everyone ||
                  isAuthor
                }
              >
                <ButtonReactPost {...reaction} collectionId={reaction._id} postId={props._id} class="aspect-square size-8" />
              </Show>
            )}
          </For>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PopupAuthorCollections;
