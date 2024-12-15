import { createEffect, createUniqueId, onCleanup, ParentComponent, Show } from "solid-js";
import { produce } from "solid-js/store";
import { Portal } from "solid-js/web";
import { mutateStore, selectStore } from "~/stores/manage";

interface Props {
  when: boolean;
  class?: string;
  noEntries?: boolean;
}

const PopupContainer: ParentComponent<Props> = (props) => {
  const entries = selectStore((store) => store.entries);
  const mutate = mutateStore();
  const id = createUniqueId();

  onCleanup(() => {
    if (!props.noEntries) {
      window.onscroll = function () {};
      mutate(
        "entries",
        produce((states) => {
          const index = states.findIndex((e) => e === id);
          if (index === -1) return;

          states.splice(index, 1);
        }),
      );
    }
  });

  createEffect(() => {
    if (!props.noEntries) {
      if (props.when) {
        mutate(
          "entries",
          produce((states) => {
            states.push(id);
          }),
        );
      } else {
        mutate(
          "entries",
          produce((states) => {
            const index = states.findIndex((e) => e === id);
            if (index === -1) return;

            states.splice(index, 1);
          }),
        );
      }
    }
  });

  createEffect(() => {
    if (!props.noEntries) {
      if (entries().length > 0) {
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        window.onscroll = function () {
          window.scrollTo(scrollLeft, scrollTop);
        };
      } else {
        window.onscroll = function () {};
      }
    }
  });

  return (
    <Show when={props.when}>
      <Portal mount={document.getElementById("portals")!}>
        <div class="fixed left-0 right-0 top-0 z-[9999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)] p-2 backdrop-blur-md">
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};

export default PopupContainer;
