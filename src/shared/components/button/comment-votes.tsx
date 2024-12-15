import { Component, For } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore } from "~/stores/manage";
import { CommentProps } from "~/types/post-interfaces";
import cn from "~/utilities/cn";
import { formatNumber } from "~/utilities/format/number";

const ButtonCommentVotes: Component<CommentProps> = (props) => {
  const mutate = mutateStore();
  const inputs: { name: "up" | "down" }[] = [{ name: "up" }, { name: "down" }];

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
    <For each={inputs}>
      {(input) => (
        <button
          class="group/icon flex items-center text-[var(--text-secondary-hover)] disabled:cursor-not-allowed disabled:text-[var(--text-secondary-hover)]"
          on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
        >
          <TooltipContainer text="Vote up" class={cn("flex items-center gap-1", { "flex-row-reverse": input.name === "up" })}>
            <Icons name="vote" typeVote={input.name} class="size-4 shrink-0 group-active/icon:scale-95" isActive />
            <span class="text-sm">{formatNumber(props.vote[input.name].count)}</span>
          </TooltipContainer>
        </button>
      )}
    </For>
  );
};

export default ButtonCommentVotes;
