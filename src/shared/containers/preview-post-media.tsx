import { createEffect, createSignal, onCleanup, onMount, ParentComponent, Show, splitProps } from "solid-js";
import Icons from "~/assets/icons";

interface Props {
  count: number;
}

const PreviewPostMediaContainer: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const [_other, _props] = splitProps(props, ["children"]);

  const [tab, setTab] = createSignal<number>(0);
  const [transition, setTransition] = createSignal<number>(0);

  const onTransition = () => {
    const gab = 8 * tab();
    const position = elRef!.offsetWidth * tab();

    setTransition(position + gab);
    elRef!.style.setProperty("--transition-width", elRef!.offsetWidth + "px");
    elRef!.style.setProperty("--transition-height", elRef!.offsetHeight + "px");
  };

  onMount(() => onTransition());
  onCleanup(() => {
    window.removeEventListener("resize", onTransition);
  });

  createEffect(() => {
    onTransition();
    window.addEventListener("resize", onTransition);
  });

  return (
    <div ref={elRef} class="relative flex h-full w-full overflow-hidden rounded-b-lg">
      <Show when={_props.count > 0 && tab() > 0}>
        <button
          class="absolute left-4 top-1/2 z-[1] aspect-square size-8 rounded-full bg-[rgba(0,0,0,0.8)] p-2 text-neutral-50 backdrop-blur-xl active:text-neutral-400"
          on:click={() => setTab(tab() - 1)}
        >
          <Icons name="arrow" class="rotate-270" />
        </button>
      </Show>
      <div
        class="flex h-full w-full gap-2 transition-transform"
        style={{ transform: `translate3d(-${transition()}px, 0px, 0px)` }}
      >
        {_other.children}
      </div>
      <Show when={_props.count > 0 && tab() < _props.count - 1}>
        <button
          class="absolute right-4 top-1/2 z-[1] aspect-square size-8 rounded-full bg-[rgba(0,0,0,0.8)] p-2 text-neutral-50 backdrop-blur-xl active:text-neutral-400"
          on:click={() => setTab(tab() + 1)}
        >
          <Icons name="arrow" class="rotate-90" />
        </button>
      </Show>
    </div>
  );
};

export default PreviewPostMediaContainer;
