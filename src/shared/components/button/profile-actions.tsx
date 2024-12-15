import { Component, Match, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { mutateStore, selectStore } from "~/stores/manage";
import { ProfileProps } from "~/types/user-interfaces";
import cn from "~/utilities/cn";

const ButtonProfileActions: Component<ProfileProps> = (props) => {
  const auth = selectStore((store) => store.auth!);
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

  const onToggle = (target: "isFollow" | "isPersonalize") => {
    mutate(
      "profile",
      produce((state) => {
        if (!state || state._id !== props._id) return;
        state[target] = !props[target];
      }),
    );
  };

  return (
    <Show when={props._id !== auth()._id}>
      <div class="inline-flex w-full max-w-md items-center gap-2">
        <button
          class={cn(
            "w-full rounded-lg bg-blue-600 p-2 text-center text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-950",
            {
              "bg-transparent text-[var(--text-primary)] outline outline-1 outline-[var(--border-primary)] active:bg-transparent disabled:bg-transparent":
                (props.isFollow && !props.haveRequestFollow) || props.haveRequestFollow,
            },
          )}
          on:click={() => onToggle("isFollow")}
        >
          <span>
            <Switch>
              <Match when={props.isFollow}>Following</Match>
              <Match when={props.haveRequestFollow}>Requested</Match>
              <Match when={!props.haveRequestFollow}>Follow</Match>
            </Switch>
          </span>
        </button>
        <button
          class={cn(
            "group/icon aspect-square size-10 shrink-0 rounded-lg bg-blue-600 p-2.5 text-center text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-950",
            {
              "bg-transparent text-[var(--text-primary)] outline outline-1 outline-[var(--border-primary)] active:bg-transparent disabled:bg-transparent":
                props.isPersonalize,
            },
          )}
          on:click={() => onToggle("isPersonalize")}
        >
          <Icons name="notification" isActive={true} class="group-active/icon:scale-95" />
        </button>
        <button
          class="group/icon aspect-square size-10 shrink-0 rounded-lg bg-blue-600 p-2.5 text-center text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-950"
          on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
        >
          <Icons name="paperPlane" class="group-active/icon:scale-95" />
        </button>
      </div>
    </Show>
  );
};

export default ButtonProfileActions;
