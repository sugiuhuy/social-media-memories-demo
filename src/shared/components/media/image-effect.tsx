import { Component, createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { twMerge } from "tailwind-merge";
import CencoredMedia from "~/shared/common/cencored-media";
import cn from "~/utilities/cn";

interface Props {
  effect: string;
  src: string;
  ratio: string;
  isCencored?: boolean;
  isManage?: boolean;
  isPreview?: boolean;
}

const ImageEffect: Component<Props> = (props) => {
  const [isCencored, setIsCencored] = createSignal<boolean>(false);
  createEffect(() => setIsCencored(props.isCencored!));

  return (
    <Switch>
      <Match when={props.isManage}>
        <div class={twMerge("flex size-full shrink-0", props.effect)}>
          <img
            src={props.src}
            alt="picture"
            class={cn("pointer-events-none size-full select-none object-none", {
              "object-cover": props.ratio == "cover",
              "object-fill": props.ratio == "fill",
              "object-contain": props.ratio == "contain",
            })}
            draggable={false}
          />
        </div>
      </Match>
      <Match when={!props.isManage}>
        <picture class={twMerge("size-full shrink-0", props.effect)} draggable={false}>
          <Show when={isCencored()}>
            <CencoredMedia onUncencored={() => setIsCencored(!isCencored())} isPreview={props.isPreview} />
          </Show>
          <img
            src={props.src}
            alt="picture"
            class={cn("pointer-events-none size-full select-none object-none", {
              "object-cover": props.ratio == "cover",
              "object-fill": props.ratio == "fill",
              "object-contain": props.ratio == "contain",
            })}
            loading="lazy"
          />
        </picture>
      </Match>
    </Switch>
  );
};

export default ImageEffect;
