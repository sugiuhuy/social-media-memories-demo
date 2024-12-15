import { Component, createEffect, createSignal, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import Spinner from "~/shared/components/media/spinner";

interface Props {
  src: string;
  speedAnimation: number;
  class?: string;
  unicode?: string;
}

const Reaction: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const [isLoaded, setIsLoaded] = createSignal<boolean>(false);

  createEffect(() => {
    if (isLoaded()) {
      elRef!.style.setProperty("--reaction-speed", `${props.speedAnimation}ms`);
      elRef!.style.setProperty("--reaction-frames", `${elRef!.offsetWidth / elRef!.offsetHeight}`);
    }
  });

  return (
    <div
      class={twMerge(
        "relative flex aspect-square size-full max-h-8 max-w-8 shrink-0 items-center justify-center overflow-hidden",
        props.class,
      )}
    >
      <div ref={elRef} class="pointer-events-none absolute left-0 top-0 z-[1] flex h-full animate-reaction select-none">
        <img src={props.src} class="flex h-full w-fit max-w-fit object-fill" loading="lazy" on:load={() => setIsLoaded(true)} />
      </div>
      <Show when={!isLoaded()}>
        <div class="absolute left-0 top-0 z-[2] flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      </Show>
    </div>
  );
};

export default Reaction;
