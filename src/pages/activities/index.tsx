import { useParams } from "@solidjs/router";
import { Component, createEffect, For, Show } from "solid-js";
import { produce, reconcile } from "solid-js/store";
import Icons from "~/assets/icons";
import generateNotifications from "~/libraries/notification-data";
import FetchNextPage from "~/shared/common/fetch-next-page";
import Avatar from "~/shared/components/media/avatar";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore, selectStore } from "~/stores/manage";
import { moment } from "~/utilities/date-moment";

const PageActivities: Component = () => {
  const params: { activity: "user" | "post" } = useParams();

  const auth = selectStore((store) => store.auth!);
  const activities = selectStore((store) => store.activities);
  const mutate = mutateStore();

  const onGenerateNotifications = (count: number) => {
    const data = generateNotifications({ count, exclude: auth()._id });
    data.map((item) => {
      mutate(
        "activities",
        produce((states) => {
          states.push(item);
        }),
      );
    });
  };

  createEffect(() => {
    if (params.activity) {
      const data = generateNotifications({ count: 10, exclude: auth()._id });
      mutate("activities", reconcile(data));
    }
  });

  createEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - ${params.activity || "all"} activities`;
  });

  return (
    <>
      <For each={activities()}>
        {(activity) => (
          <a
            href={activity.url}
            class="flex w-full gap-2 rounded-lg bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)] hover:outline-blue-600"
          >
            <Avatar {...activity.sender} class="size-14 rounded-full text-4xl" />
            <div class="flex w-full items-center">
              <div class="flex w-full flex-col justify-center">
                <div class="flex w-full">
                  <div class="inline-flex w-full overflow-hidden">
                    <div class="truncate">
                      <div class="m-0 inline-flex items-center p-0">
                        <span>{activity.sender.name}</span>
                        <Show when={activity.sender.isVerified}>
                          <TooltipContainer text="Account is verified" class="ml-1 flex items-center justify-center">
                            <Icons name="verified" class="aspect-square size-4 shrink-0" />
                          </TooltipContainer>
                        </Show>
                      </div>
                      <div class="ml-2 inline whitespace-pre-line break-words text-[var(--text-secondary)]">
                        <Show when={activity.isRequestFollowing && activity.category === "user"} fallback={activity.message}>
                          send a request to follow you
                        </Show>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="text-sm text-[var(--text-secondary-hover)]">{moment(activity.createdAt)}</span>
              </div>
              <div
                class={`ml-2 flex aspect-square size-1 shrink-0 rounded-full ${activity.isRead ? "bg-transparent" : "bg-blue-600"}`}
              />
            </div>
          </a>
        )}
      </For>
      <FetchNextPage count={activities().length} limit={10} max={50} onGenerate={onGenerateNotifications} />
    </>
  );
};

export default PageActivities;
