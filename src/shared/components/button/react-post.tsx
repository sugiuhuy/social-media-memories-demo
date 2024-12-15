import { ParentComponent } from "solid-js";
import { produce } from "solid-js/store";
import { twJoin } from "tailwind-merge";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore } from "~/stores/manage";
import cn from "~/utilities/cn";
import Reaction from "../media/reaction";

interface Props {
  postId: string;
  collectionId: string;
  src: string;
  speedAnimation: number;
  isUsed: boolean;
  unicode: string;
  class?: string;
}

const ButtonReactPost: ParentComponent<Props> = (props) => {
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
    <button
      class={cn(
        "group/icon flex h-fit rounded-md border border-solid border-[var(--bg-secondary-active)] bg-[var(--border-secondary)] hover:border-blue-500 hover:bg-sky-950 disabled:cursor-not-allowed",
        { "border-sky-600 bg-sky-200 text-neutral-50 dark:bg-sky-950": props.isUsed },
      )}
      on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
    >
      <TooltipContainer
        text={`:${props.unicode}:`}
        class={cn("flex h-full w-full items-center p-1", { "gap-2.5 px-2 py-0.5": props.children })}
      >
        <div class={twJoin("flex size-4 group-active/icon:scale-95", props.class)}>
          <Reaction {...props} />
        </div>
        {props.children}
      </TooltipContainer>
    </button>
  );
};

export default ButtonReactPost;
