import { Component, Show } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import AuthorTooltip from "~/shared/common/author-tooltip";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore } from "~/stores/manage";
import { PostProps } from "~/types/post-interfaces";
import { postMoment } from "~/utilities/date-moment";
import Avatar from "../media/avatar";

const CardPostAuthor: Component<PostProps> = (props) => {
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
    <div class="flex w-full items-center gap-2">
      <Avatar {...props.author} class="size-12 rounded-full text-3xl max-md:size-11 max-md:text-2xl" />
      <div class="flex w-full max-w-full flex-col overflow-hidden">
        <div class="flex items-center">
          <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
            <AuthorTooltip {...props.author} />
            <Show when={props.author.isVerified}>
              <TooltipContainer text="Account is verified" class="ml-1 flex">
                <Icons name="verified" class="aspect-square size-4 shrink-0" />
              </TooltipContainer>
            </Show>
          </div>
        </div>
        <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
          <span class="truncate text-xs text-[var(--text-secondary-hover)]">
            @{props.author.username} • {postMoment(props.createdAt)}
          </span>
        </div>
      </div>
      <button
        class="group/icon flex shrink-0"
        on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
      >
        <Icons name="options" typeOptions="3 dot horizontal" class="aspect-square size-5 shrink-0 group-active/icon:scale-95" />
      </button>
    </div>
  );
};

export default CardPostAuthor;
