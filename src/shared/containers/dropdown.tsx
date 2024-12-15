import { useIsRouting } from "@solidjs/router";
import { createEffect, onCleanup, ParentComponent } from "solid-js";
import { produce } from "solid-js/store";
import { mutateStore } from "~/stores/manage";

interface Props {
  when: boolean;
  onClose: () => void;
}

const DropdownContainer: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const isRouting = useIsRouting();
  const mutate = mutateStore();

  const onClose = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();

    const related = e as MouseEvent;
    if (!props.when) return;
    if (elRef!.contains(e.target as Node)) return;
    if (elRef!.contains(related.relatedTarget as Node)) return;

    props.onClose();
  };

  const onCloseWhenPressEscape = (e: KeyboardEvent) => {
    e.stopPropagation();

    if (!props.when) return;
    if (e.key !== "Escape") return;

    props.onClose();
  };

  onCleanup(() => {
    window.removeEventListener("keydown", onCloseWhenPressEscape);
    window.removeEventListener("wheel", onClose);
    document.removeEventListener("mousedown", onClose);
    document.removeEventListener("touchmove", onClose);
  });

  createEffect(() => {
    if (props.when) {
      mutate(
        "entries",
        produce((states) => {
          if (states.findIndex((e) => e === "dropdown") !== -1) return;
          states.push("dropdown");
        }),
      );
    } else {
      mutate(
        "entries",
        produce((states) => {
          const index = states.findIndex((e) => e === "dropdown");
          if (index === -1) return;

          states.splice(index, 1);
        }),
      );
    }
  });

  createEffect(() => {
    window.addEventListener("keydown", onCloseWhenPressEscape);
    window.addEventListener("wheel", onClose);
    document.addEventListener("mousedown", onClose);
    document.addEventListener("touchmove", onClose);
  });

  createEffect(() => {
    if (isRouting()) {
      props.onClose();
      mutate(
        "entries",
        produce((states) => {
          const index = states.findIndex((e) => e === "dropdown");
          if (index === -1) return;

          states.splice(index, 1);
        }),
      );
    }
  });

  return (
    <div ref={elRef} class="relative">
      {props.children}
    </div>
  );
};

export default DropdownContainer;
