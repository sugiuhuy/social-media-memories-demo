import { Component, For, Show } from "solid-js";
import { produce } from "solid-js/store";
import { mutateStore, selectStore } from "~/stores/manage";
import cn from "~/utilities/cn";
import CardUser from "../components/card/user";

const ShowSuggestions: Component = () => {
  const users = selectStore((store) => store.userSuggestions);
  const mutate = mutateStore();

  const onFollow = (payload: { userId: string; isFollow: Boolean }) => {
    mutate(
      "userSuggestions",
      (states) => states._id === payload.userId,
      produce((state) => {
        state.isFollow = !payload.isFollow;
      }),
    );
  };

  return (
    <div class="mt-2 flex flex-col gap-2">
      <span class="text-[var(--text-secondary-hover)]">Suggestions</span>
      <For each={users()}>
        {(user) => (
          <div class="flex w-full items-center gap-2 rounded-lg p-2 outline outline-1 outline-[var(--border-primary)]">
            <CardUser {...user} avatarSize="small" isNavigate />
            <button
              class={cn("text-sm text-blue-600 active:text-blue-700", {
                "text-[var(--text-primary)] active:text-[var(--text-secondary)]": user.isFollow,
              })}
              on:click={() => onFollow({ isFollow: user.isFollow, userId: user._id })}
            >
              <Show when={user.isFollow} fallback={"Follow"}>
                Followed
              </Show>
            </button>
          </div>
        )}
      </For>
    </div>
  );
};

export default ShowSuggestions;
