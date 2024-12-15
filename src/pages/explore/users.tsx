import { Component, For, onMount, Show } from "solid-js";
import { produce, reconcile } from "solid-js/store";
import { generateSearchUsers } from "~/libraries/user-data";
import FetchNextPage from "~/shared/common/fetch-next-page";
import CardUser from "~/shared/components/card/user";
import { mutateStore, selectStore } from "~/stores/manage";
import cn from "~/utilities/cn";

const PageExploreUsers: Component = () => {
  const users = selectStore((store) => store.searchUsers);
  const mutate = mutateStore();

  const onGenerateUsers = () => {
    const data = generateSearchUsers({ count: 10, isAction: false, haveRequestFollow: false });
    data.map((item) => {
      mutate(
        "searchUsers",
        produce((states) => {
          states.push(item);
        }),
      );
    });
  };

  const onFollow = (payload: { userId: string; isFollow: boolean }) => {
    mutate(
      "searchUsers",
      (states) => states._id === payload.userId,
      produce((state) => {
        state.isFollow = !payload.isFollow;
      }),
    );
  };

  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - explore users`;
    const data = generateSearchUsers({ count: 10, isAction: false, haveRequestFollow: false });
    mutate("searchUsers", reconcile(data));
  });

  return (
    <>
      <div class="flex w-full flex-col gap-3 max-md:px-2">
        <For each={users()}>
          {(user) => (
            <div class="flex w-full items-center gap-2 rounded-lg p-2 outline outline-1 outline-[var(--border-primary)]">
              <CardUser {...user} avatarSize="medium" />
              <button
                class={cn("shrink-0 text-blue-600 active:text-blue-700", {
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
      <Show when={users().length >= 10}>
        <FetchNextPage count={users().length} limit={10} max={50} onGenerate={onGenerateUsers} />
      </Show>
    </>
  );
};

export default PageExploreUsers;
