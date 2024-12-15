import { Component, Match, onMount, Switch } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props {
  avatar: string | null;
  display: { initial: string; color: string };
  class: string;
}

const Avatar: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  let initRef: HTMLDivElement | undefined;

  onMount(() => {
    elRef!.style.setProperty("--bg-avatar-color", props.display.color);
  });

  return (
    <picture
      ref={elRef}
      class={twMerge("pointer-events-none relative aspect-square shrink-0 overflow-hidden rounded-full", props.class)}
      draggable={false}
    >
      <Switch>
        <Match when={props.avatar}>
          <img src={props.avatar!} alt="avatar" class="size-full select-none object-cover object-center" loading="lazy" />
        </Match>
        <Match when={!props.avatar}>
          <div ref={initRef} class="flex size-full select-none items-center justify-center bg-[var(--bg-avatar-color)]">
            <span class="uppercase text-neutral-50 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)]">{props.display.initial}</span>
          </div>
        </Match>
      </Switch>
    </picture>
  );
};

export default Avatar;
