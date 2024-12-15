import { ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import { CommentProps } from "~/types/post-interfaces";
import cn from "~/utilities/cn";
import transformContentPattern from "~/utilities/transform-pattern";
import Avatar from "../media/avatar";

const CardReplyingComment: ParentComponent<CommentProps> = (props) => {
  return (
    <div class="flex w-full gap-1">
      <div class={cn("relative ml-2 flex h-full w-10 shrink-0", { "ml-0 w-8": props.children })}>
        <div
          class={cn(
            "absolute bottom-0 right-0 h-[calc(100%-0.8rem)] w-7 border-l border-t border-solid border-[var(--border-secondary)]",
            { "h-1/2 w-5": props.children },
          )}
        />
      </div>
      <div class={cn("flex w-full gap-2 overflow-hidden", { "items-center": props.children })}>
        <div class="flex h-fit w-full gap-2">
          <Avatar {...props.author} class="aspect-square size-7 rounded-full text-sm" />
          <div class="flex w-full items-center overflow-hidden">
            <div class="inline-flex w-full overflow-hidden">
              <div class="truncate text-sm">
                <div class="m-0 inline-flex items-center p-0">
                  <a href={`/@${props.author.username}`} class="text-blue-600 active:text-blue-700">
                    {props.author.name}
                  </a>
                  <Show when={props.author.isVerified}>
                    <TooltipContainer text="Account verified" class="ml-1 flex items-center justify-center">
                      <Icons name="verified" class="aspect-square size-3 shrink-0" />
                    </TooltipContainer>
                  </Show>
                </div>
                <div
                  class={cn("ml-2 inline break-words text-[var(--text-secondary)]", {
                    "whitespace-pre-line": !props.children,
                  })}
                  innerHTML={transformContentPattern(props.getText)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default CardReplyingComment;
