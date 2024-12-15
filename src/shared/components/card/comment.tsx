import { Component, Setter, Show } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import AuthorTooltip from "~/shared/common/author-tooltip";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore } from "~/stores/manage";
import { CommentProps } from "~/types/post-interfaces";
import { commentMoment } from "~/utilities/date-moment";
import transformContentPattern from "~/utilities/transform-pattern";
import ButtonCommentVotes from "../button/comment-votes";
import Avatar from "../media/avatar";
import CardReplyingComment from "./replying-comment";

interface Props extends CommentProps<{ replyingAt: CommentProps | null }> {
  setReplyingComment: Setter<CommentProps | null>;
}

const CardComment: Component<Props> = (props) => {
  const mutate = mutateStore();

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  return (
    <div class="flex w-full flex-col gap-1 md:mb-2">
      <Show when={props.replyingAt}>
        <CardReplyingComment {...props.replyingAt!} />
      </Show>
      <div class="z-[1] flex w-full gap-2">
        <div class="flex h-full flex-col items-center">
          <Avatar {...props.author} class="aspect-square size-11 rounded-full text-3xl" />
        </div>
        <div class="flex w-full flex-col items-center gap-2">
          <div class="flex w-full">
            <div class="inline-flex w-full overflow-hidden">
              <div class="truncate">
                <div class="m-0 inline-flex items-center p-0">
                  <AuthorTooltip {...props.author} />
                  <Show when={props.author.isVerified}>
                    <TooltipContainer text="Account is verified" class="ml-1 flex items-center justify-center">
                      <Icons name="verified" class="aspect-square size-4 shrink-0" />
                    </TooltipContainer>
                  </Show>
                </div>
                <div class="ml-2 inline whitespace-pre-line break-words" innerHTML={transformContentPattern(props.getText)} />
              </div>
            </div>
          </div>
          <div class="flex w-full items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="text-sm text-[var(--text-secondary-hover)]">{commentMoment(props.createdAt)}</span>
              <ButtonCommentVotes {...props} />
              <button
                class="group/icon size-4 shrink-0 text-[var(--text-secondary)]"
                on:click={() => props.setReplyingComment(props)}
              >
                <Icons name="replying" class="aspect-square size-4 group-active/icon:scale-95" />
              </button>
            </div>
            <button
              class="group/icon size-4 shrink-0 text-[var(--text-secondary)]"
              on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
            >
              <Icons name="options" typeOptions="3 dot horizontal" class="aspect-square size-4 group-active/icon:scale-95" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComment;
