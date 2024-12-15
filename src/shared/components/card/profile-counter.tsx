import { Component, Match, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { mutateStore, selectStore } from "~/stores/manage";
import { ProfileProps } from "~/types/user-interfaces";
import { formatNumber } from "~/utilities/format/number";

const CardProfileCounter: Component<ProfileProps> = (props) => {
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

  return (
    <div class="inline-flex w-full max-w-md items-center justify-between gap-2">
      <div class="inline-flex items-center gap-2">
        <button
          class="text-[var(--text-secondary-hover)] hover:underline active:underline"
          on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
        >
          <span class="text-[var(--text-secondary)]">{formatNumber(props.countFollowers)}</span> <span>followers</span>
        </button>
        <button
          class="text-[var(--text-secondary-hover)] hover:underline active:underline"
          on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
        >
          <span class="text-[var(--text-secondary)]">{formatNumber(props.countFollowing)}</span> <span>following</span>
        </button>
        <div class="text-[var(--text-secondary-hover)]">
          <span class="text-[var(--text-secondary)]">{formatNumber(props.countPosts)}</span> <span>posts</span>
        </div>
      </div>
      <Switch>
        <Match when={props._id === auth()._id}>
          <a href="/account" class="group/icon aspect-square size-6 shrink-0 max-md:hidden">
            <Icons name="setting" class="size-5" />
          </a>
        </Match>
        <Match when={props._id !== auth()._id}>
          <button
            class="group/icon aspect-square size-5 shrink-0 max-md:hidden"
            on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
          >
            <Icons name="options" typeOptions="3 dot horizontal" class="group-active/icon:scale-95" />
          </button>
        </Match>
      </Switch>
    </div>
  );
};

export default CardProfileCounter;
