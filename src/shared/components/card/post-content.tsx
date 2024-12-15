import { Component, createEffect, createSignal, Show } from "solid-js";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import { PostProps } from "~/types/post-interfaces";
import transformContentPattern from "~/utilities/transform-pattern";

interface Props extends PostProps {
  noTruncate?: boolean;
}

const CardPostContent: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const [ellipsis, setEllipsis] = createSignal<boolean>(false);

  createEffect(() => {
    setEllipsis(elRef!.offsetHeight >= 150);
  });

  return (
    <div class="flex w-full">
      <div ref={elRef} class="inline-flex w-full overflow-hidden">
        <div class="truncate">
          <div class="m-0 inline-flex items-center p-0">
            <a href={`/@${props.author.username}`} class="text-blue-600 no-underline active:text-blue-700">
              {props.author.name}
            </a>
            <Show when={props.author.isVerified}>
              <TooltipContainer text="Account is verified" class="ml-1 flex items-center justify-center">
                <Icons name="verified" class="aspect-square size-4 shrink-0" />
              </TooltipContainer>
            </Show>
          </div>
          <div
            class={`inline ${!props.noTruncate && ellipsis() ? "whitespace-line" : "whitespace-pre-line break-words"} ml-2`}
            innerHTML={transformContentPattern(props.getText)}
          />
        </div>
      </div>
      <Show when={!props.noTruncate && ellipsis()}>
        <button
          class="hover:dotted ml-3 flex min-w-fit text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          on:click={() => setEllipsis(false)}
        >
          more
        </button>
      </Show>
    </div>
  );
};

export default CardPostContent;
