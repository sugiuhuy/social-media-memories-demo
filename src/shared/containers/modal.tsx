import { createEffect, onCleanup, ParentComponent } from "solid-js";
import { twMerge } from "tailwind-merge";
import { selectStore } from "~/stores/manage";

interface Props {
  class: string;
  onClose: () => void;
}

const ModalContainer: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const toasts = selectStore((store) => store.toasts);

  const onClickOutsideModal = (event: MouseEvent) => {
    if (elRef!.contains(event.target as Node)) return;
    if (elRef!.contains(event.relatedTarget as Node)) return;
    if (toasts().length > 0) return;

    props.onClose();
  };

  const onPressEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    if (elRef!.contains(event.target as Node)) return;
    if (toasts().length > 0) return;

    props.onClose();
  };

  onCleanup(() => {
    window.removeEventListener("keydown", onPressEscape);
    document.removeEventListener("mousedown", onClickOutsideModal);
  });

  createEffect(() => {
    window.addEventListener("keydown", onPressEscape);
    document.addEventListener("mousedown", onClickOutsideModal);
  });

  return (
    <div
      ref={elRef}
      class={twMerge(
        "animate-zoom-out divide-y divide-solid divide-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] shadow-sm outline outline-1 outline-[var(--border-secondary)]",
        props.class,
      )}
    >
      {props.children}
    </div>
  );
};

export default ModalContainer;
