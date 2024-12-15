import { Component, createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import Icons from "~/assets/icons";
import Avatar from "~/shared/components/media/avatar";
import { AuthorProps } from "~/types/post-interfaces";
import cn from "~/utilities/cn";
import { moment } from "~/utilities/date-moment";
import { formatNumber } from "~/utilities/format/number";

const AuthorTooltip: Component<AuthorProps> = (props) => {
  let elRef: HTMLAnchorElement | undefined;
  let contRef: HTMLDivElement | undefined;

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
    const tooltipRect = contRef!.getBoundingClientRect();

    let { x, y } = inContainerTooltip!;
    y = y > window.innerHeight - tooltipRect.height ? window.innerHeight - tooltipRect.height : y;
    x = x > window.innerWidth - tooltipRect.width ? window.innerWidth - tooltipRect.width : x;

    contRef!.style.setProperty("--tooltip-top", `${y + inContainerTooltip!.height + 8}px`);
    contRef!.style.setProperty("--tooltip-left", `${x}px`);
  };

  onMount(() => onReposition());

  onCleanup(() => {
    elRef!.removeEventListener("mousemove", onReposition);
  });

  createEffect(() => {
    elRef!.addEventListener("mousemove", onReposition);
  });

  return (
    <a
      ref={elRef}
      href={`/@${props.username}`}
      class="truncate text-blue-600 no-underline active:text-blue-700"
      on:mouseenter={onMouseEnter}
      on:mouseleave={onMouseLeave}
    >
      {props.name}
      <Portal mount={document.getElementById("portals")!}>
        <div
          ref={contRef}
          class={cn(
            "pointer-events-none fixed left-[var(--tooltip-left)] top-[var(--tooltip-top)] z-[999999] flex w-full max-w-80 select-none flex-col items-center gap-2 rounded-lg bg-[var(--bg-secondary)] p-3 opacity-0 outline outline-1 outline-[var(--border-secondary)] transition-opacity",
            { "opacity-100": isShow() },
          )}
        >
          <div class="flex w-full items-center gap-2">
            <Avatar {...props} class="size-12 rounded-full text-3xl max-md:size-11 max-md:text-2xl" />
            <div class="flex w-full max-w-full flex-col overflow-hidden">
              <div class="flex items-center">
                <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
                  <span class="truncate">{props.name}</span>
                  <Show when={props.isVerified}>
                    <Icons name="verified" class="ml-1 flex aspect-square size-4 shrink-0" />
                  </Show>
                </div>
              </div>
              <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
                <span class="truncate text-sm text-[var(--text-secondary-hover)]">@{props.username}</span>
              </div>
            </div>
          </div>
          <div class="flex w-full flex-col gap-0.5">
            <div class="flex w-full items-center gap-2 text-xs text-[var(--text-secondary-hover)]">
              <div class="inline-flex items-center gap-1">
                <Icons name="calendar" class="-mt-0.5 aspect-square size-3" />
                <span>{moment(props.createdAt)}</span>
              </div>
              <span>•</span>
              <span>{formatNumber(props.countPosts)} posts</span>
            </div>
            <Show when={props.bio.trim().length > 0}>
              <span class="mb-2 text-sm">{props.bio}</span>
            </Show>
            <div class="flex w-full gap-2">
              <span class="text-xs text-[var(--text-secondary)]">{formatNumber(props.countFollowers)} Followers</span>
              <span class="text-xs text-[var(--text-secondary)]">{formatNumber(props.countFollowing)} Following</span>
            </div>
          </div>
        </div>
      </Portal>
    </a>
  );
};

export default AuthorTooltip;
