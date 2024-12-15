import { createSignal, onCleanup, onMount, ParentComponent, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import Icons from "~/assets/icons";
import cn from "~/utilities/cn";

interface Props {
  class: string;
  count: number;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const SwiperContainer: ParentComponent<Props> = (props) => {
  let elementRef: HTMLDivElement | undefined;
  let offsetXRef: number = 0;
  let startXRef: number = 0;
  let currentOffsetXRef: number = 0;
  let minOffsetXRef: number = 0;
  let containerWidthRef: number = 0;

  const minSwipeRequired = 40;
  const [offsetX, setOffsetX] = createSignal<number>(0);
  const [isSwiping, setIsSwiping] = createSignal<boolean>(false);
  const [currentIndex, setCurrentIndex] = createSignal<number>(0);

  const onSwipeMove = (event: TouchEvent | MouseEvent) => {
    if (props.count === 1) return;
    const diff = startXRef - ("changedTouches" in event ? event.changedTouches[0].clientX : event.clientX);

    let newOffsetX = currentOffsetXRef - diff;
    const maxOffsetX = 0;
    const minOffsetX = Math.min(minOffsetXRef, 0);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onSwipeEnd = () => {
    const containerWidth = containerWidthRef;
    const currentOffsetX = currentOffsetXRef;
    const minOffsetX = Math.min(minOffsetXRef, 0);

    let newOffsetX = offsetX();
    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > minSwipeRequired) {
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      } else {
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX < minOffsetX ? minOffsetX : newOffsetX);
    setCurrentIndex(Math.abs(newOffsetX / containerWidth));

    offsetXRef = newOffsetX;

    // window.removeEventListener("touchmove", onSwipeMove);
    // window.removeEventListener("touchend", onSwipeEnd);
    window.removeEventListener("mousemove", onSwipeMove);
    window.removeEventListener("mouseup", onSwipeEnd);
  };

  const onSwipeStart = (event: TouchEvent | MouseEvent) => {
    setIsSwiping(true);

    currentOffsetXRef = offsetXRef;
    startXRef = "changedTouches" in event ? event.changedTouches[0].clientX : event.clientX;
    containerWidthRef = elementRef!.offsetWidth;
    minOffsetXRef = elementRef!.offsetWidth - elementRef!.scrollWidth;

    // window.addEventListener("touchmove", onSwipeMove);
    // window.addEventListener("touchend", onSwipeEnd);
    window.addEventListener("mousemove", onSwipeMove);
    window.addEventListener("mouseup", onSwipeEnd);
  };

  const onSwipe = (id: number) => {
    setCurrentIndex(id);
    setOffsetX(-(elementRef!.offsetWidth * id));
    offsetXRef = -(elementRef!.offsetWidth * id);
  };

  const onHandleResizeWindo = () => {
    setOffsetX(-(elementRef!.offsetWidth * currentIndex()));
    offsetXRef = -(elementRef!.offsetWidth * currentIndex());
  };

  onMount(() => {
    window.addEventListener("resize", onHandleResizeWindo);
  });

  onCleanup(() => {
    window.removeEventListener("resize", onHandleResizeWindo);
  });

  return (
    <div
      class={twMerge("relative", props.class)}
      on:mousedown={onSwipeStart}
      on:touchstart={onSwipeStart}
      on:touchmove={onSwipeMove}
      on:touchend={onSwipeEnd}
    >
      <Show when={currentIndex() > 0}>
        <button
          type="button"
          class="group/icon absolute left-2 top-1/2 z-[1] rounded-full bg-[rgba(0,0,0,0.6)] p-2 text-neutral-400 backdrop-blur-xl max-md:text-neutral-50 md:hover:text-neutral-50"
          on:click={() => onSwipe(currentIndex() - 1)}
        >
          <Icons name="arrow" class="aspect-square size-4 rotate-270 group-active/icon:scale-95" />
        </button>
      </Show>
      <div
        class={cn("flex h-full w-full touch-pan-y select-none overflow-hidden bg-[var(--bg-secondary)]", {
          "rounded-sm": props.rounded === "sm",
          "rounded-md": props.rounded === "md",
          "rounded-lg": props.rounded === "lg",
          "rounded-xl": props.rounded === "xl",
          "rounded-2xl": props.rounded === "2xl",
          "rounded-3xl": props.rounded === "3xl",
        })}
      >
        <div
          ref={elementRef}
          class={cn("origin-0 m-0 flex min-w-full cursor-auto flex-row p-0", {
            "cursor-grabbing transition-none": props.count > 1 && isSwiping(),
            "cursor-grab transition-transform": props.count > 1 && !isSwiping(),
          })}
          style={{ transform: `translate3d(${offsetX()}px, 0,0)` }}
        >
          {props.children}
        </div>
      </div>
      <Show when={currentIndex() < props.count - 1}>
        <button
          type="button"
          class="group/icon absolute right-2 top-1/2 z-[1] rounded-full bg-[rgba(0,0,0,0.6)] p-2 text-neutral-400 backdrop-blur-xl max-md:text-neutral-50 md:hover:text-neutral-50"
          on:click={() => onSwipe(currentIndex() + 1)}
        >
          <Icons name="arrow" class="aspect-square size-4 rotate-90 group-active/icon:scale-95" />
        </button>
      </Show>
    </div>
  );
};

export default SwiperContainer;
