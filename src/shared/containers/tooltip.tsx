import { createEffect, createSignal, onCleanup, onMount, ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";
import cn from "~/utilities/cn";

interface Props {
  text: string;
  class?: string;
  onclick?: () => void;
}

const TooltipContainer: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  let textRef: HTMLDivElement | undefined;

  const [isShow, setIsShow] = createSignal<boolean>(false);

  const onMouseEnter = () => {
    if (navigator.maxTouchPoints > 0) return;
    setIsShow(true);
  };
  const onMouseLeave = () => {
    if (navigator.maxTouchPoints > 0) return;
    setIsShow(false);
  };

  const onReposition = () => {
    const inContainerTooltip = elRef!.getBoundingClientRect();
    const tooltipRect = textRef!.getBoundingClientRect();

    let { x, y } = inContainerTooltip!;
    y = y > window.innerHeight - tooltipRect.height ? window.innerHeight - tooltipRect.height : y;
    x = x > window.innerWidth - tooltipRect.width ? window.innerWidth - tooltipRect.width : x;

    textRef!.style.setProperty("--tooltip-top", `${y + inContainerTooltip!.height + 8}px`);
    textRef!.style.setProperty("--tooltip-left", `${x}px`);
  };

  onMount(() => {
    onReposition();
  });

  onCleanup(() => {
    elRef!.removeEventListener("mousemove", onReposition);
  });

  createEffect(() => {
    elRef!.addEventListener("mousemove", onReposition);
  });

  return (
    <div ref={elRef} class={props.class} on:click={props.onclick} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
      {props.children}
      <Portal mount={document.getElementById("portals")!}>
        <div
          ref={textRef}
          class={cn(
            "pointer-events-none fixed left-[var(--tooltip-left)] top-[var(--tooltip-top)] z-[999999] select-none rounded-lg bg-[var(--bg-secondary)] px-2 py-1.5 text-sm opacity-0 outline outline-1 outline-[var(--border-secondary)] transition-opacity",
            { "opacity-100": isShow() },
          )}
        >
          {props.text}
        </div>
      </Portal>
    </div>
  );
};

export default TooltipContainer;
