import { createSignal } from "solid-js";
import { Component } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import AlertContainer from "~/shared/containers/alert";
import PopupContainer from "~/shared/containers/popup";
import { mutateStore } from "~/stores/manage";
import { CollectionProps } from "~/types/user-interfaces";
import { formatNumber } from "~/utilities/format/number";
import Reaction from "../media/reaction";

const CardCollection: Component<CollectionProps> = (props) => {
  const mutate = mutateStore();
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  const onSubmit = () => {
    mutate(
      "collections",
      produce((states) => {
        const index = states.findIndex((e) => e._id === props._id);
        if (index === -1) return;
        states.splice(index, 1);
      }),
    );
  };

  const onClick = () => mutate("collectionDetails", props);

  return (
    <>
      <div class="flex w-full items-center gap-2 rounded-md bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]">
        <div class="aspect-square size-9 shrink-0 rounded-md bg-[var(--bg-secondary-hover)] p-1">
          <Reaction {...props} />
        </div>
        <div class="flex w-full flex-col justify-center overflow-hidden">
          <span class="truncate text-sm">:{props.unicode}:</span>
          <span class="truncate text-xs text-[var(--text-secondary-hover)]">{formatNumber(props.countUsed)} people used</span>
        </div>
        <a
          href={`/account/collections/edit/${props._id}`}
          class="aspect-square size-7 shrink-0 rounded-md bg-blue-600 p-1.5 active:bg-blue-700"
          on:click={onClick}
        >
          <Icons name="pen" typePen="box" class="size-full" />
        </a>
        <button
          class="aspect-square size-7 shrink-0 rounded-md bg-red-600 p-1.5 active:bg-red-700"
          on:click={() => setIsOpen(!isOpen())}
        >
          <Icons name="trash" class="size-full" />
        </button>
      </div>
      <PopupContainer when={isOpen()}>
        <AlertContainer description="Are you sure you want to delete this collection?" typeAlert="warning">
          <button
            class="flex w-full justify-center border-r border-solid border-[var(--border-secondary)] px-2 py-3 text-red-600 active:text-red-700 disabled:cursor-not-allowed disabled:text-[var(--text-secondary)]"
            on:click={() => setIsOpen(false)}
          >
            <span class="text-base">Cancel</span>
          </button>
          <button
            class="flex w-full justify-center px-2 py-3 text-sky-600 active:text-sky-700 disabled:cursor-not-allowed disabled:text-[var(--text-secondary)]"
            on:click={onSubmit}
          >
            <span class="text-base">Delete</span>
          </button>
        </AlertContainer>
      </PopupContainer>
    </>
  );
};

export default CardCollection;
