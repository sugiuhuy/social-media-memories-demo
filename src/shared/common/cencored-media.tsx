import { Component, Show } from "solid-js";
import Icons from "~/assets/icons";
import cn from "~/utilities/cn";

interface Props {
  onUncencored?: () => void;
  isPreview?: boolean;
}

const CencoredMedia: Component<Props> = (props) => {
  return (
    <div class="absolute left-0 right-0 top-0 z-[2] flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.9)] backdrop-blur-xl">
      <Icons
        name="eye"
        isActive={false}
        class={cn("aspect-square size-full max-h-12 max-w-12 text-neutral-50", {
          "max-h-6 max-w-6": props.isPreview,
        })}
      />
      <Show when={!props.isPreview}>
        <span class="justify-center text-center text-2xl text-neutral-50">Sensitive content</span>
        <span class="mt-2 justify-center text-center text-sm text-neutral-300">
          This media may contain graphic or violent content
        </span>
        <Show when={props.onUncencored}>
          <button
            class="mt-5 flex rounded-lg bg-sky-600 px-4 py-2 text-neutral-50 hover:bg-sky-700 active:bg-sky-800"
            on:click={props.onUncencored}
          >
            View
          </button>
        </Show>
      </Show>
    </div>
  );
};

export default CencoredMedia;
