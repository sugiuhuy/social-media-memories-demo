import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
import Icons from "~/assets/icons";
import CencoredMedia from "~/shared/common/cencored-media";
import Spinner from "~/shared/components/media/spinner";
import { selectStore } from "~/stores/manage";
import cn from "~/utilities/cn";

interface Props {
  src: string;
  isCencored?: boolean;
  isPreview?: boolean;
}

const Video: Component<Props> = (props) => {
  let viRef: HTMLVideoElement | undefined;
  let timeRef: HTMLDivElement | undefined;

  const entries = selectStore((store) => store.entries);
  const inViewport = createVisibilityObserver({ threshold: 0.35 })(() => viRef);

  const [isBuffering, setIsBuffering] = createSignal<boolean>(true);
  const [isPlaying, setIsPlaying] = createSignal<boolean>(false);
  const [isMuted, setIsMuted] = createSignal<boolean>(true);
  const [isCencored, setIsCencored] = createSignal<boolean>(false);

  const onUpdateCurrentTime = () => {
    if (props.isPreview) return;
    timeRef!.style.setProperty("--progress-position", `${viRef!.currentTime / viRef!.duration}`);
  };

  onMount(() => {
    setIsCencored(props.isCencored!);
  });

  createEffect(() => {
    if (isPlaying() && !props.isPreview) {
      viRef!.play();
    } else {
      viRef!.pause();
    }
  });

  createEffect(() => {
    viRef!.muted = isMuted();
  });

  createEffect(() => {
    if (!props.isCencored) {
      setIsPlaying(inViewport());
    }
  });

  createEffect(() => {
    if (inViewport() || (!props.isCencored && !props.isPreview)) {
      setIsPlaying(inViewport() && !entries().length);
    }
  });

  createEffect(() => {
    setIsCencored(props.isCencored!);
  });

  return (
    <div
      class={cn("pointer-events-auto relative flex h-full w-full shrink-0 overflow-hidden", {
        "pointer-events-none": props.isPreview,
      })}
    >
      <Show when={isCencored()}>
        <CencoredMedia onUncencored={() => setIsCencored(!isCencored())} isPreview={props.isPreview} />
      </Show>
      <Show when={isBuffering()}>
        <div class="bg-transparent-6 absolute left-0 top-0 z-[2] flex h-full w-full cursor-not-allowed items-center justify-center">
          <Spinner />
        </div>
      </Show>
      <video
        ref={viRef}
        src={props.src}
        class="h-full w-full cursor-pointer object-cover object-center"
        loop
        on:click={() => setIsPlaying(inViewport() ? !isPlaying() : false)}
        on:timeupdate={onUpdateCurrentTime}
        on:loadeddata={() => setIsBuffering(false)}
        on:waiting={() => setIsBuffering(true)}
        on:playing={() => setIsBuffering(false)}
      />
      <Show when={!props.isPreview}>
        <div class="absolute bottom-3 right-3 z-[1] flex gap-3">
          <button class="button-video-action" on:click={() => setIsPlaying(!isPlaying())}>
            <Icons name="videoActions" typeVideoActions={isPlaying() ? "play" : "pause"} class="aspect-square size-4" />
          </button>
          <button class="button-video-action" on:click={() => setIsMuted(!isMuted())}>
            <Icons name="mute" isMuted={isMuted()} class="aspect-square size-4" />
          </button>
        </div>
        <div
          ref={timeRef}
          class="absolute bottom-0 left-0 right-0 z-[1] flex h-[3px] w-full bg-neutral-800 after:absolute after:left-0 after:right-[calc(100%_-_var(--progress-position)_*_100%)] after:top-0 after:h-full after:bg-rose-600 after:content-['']"
        ></div>
      </Show>
    </div>
  );
};

export default Video;
