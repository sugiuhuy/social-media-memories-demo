import { Component, For, onMount } from "solid-js";
import { createStore, produce, SetStoreFunction } from "solid-js/store";
import InputRadio from "~/shared/components/input/radio";
import InputSwitcher from "~/shared/components/input/switcher";
import { mutateStore, selectStore } from "~/stores/manage";

const PagePushNotifications: Component = () => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  type InitialPushNotificationsProps = { private: boolean; on: boolean; off: boolean };
  const [postReaction, setPostReaction] = createStore<InitialPushNotificationsProps>({ off: false, on: false, private: false });
  const [postComment, setpostComment] = createStore<InitialPushNotificationsProps>({ off: false, on: false, private: false });
  const [votedComment, setVotedComment] = createStore<InitialPushNotificationsProps>({ off: false, on: false, private: false });
  const [tagged, setTagged] = createStore<InitialPushNotificationsProps>({ off: false, on: false, private: false });
  const [mentioned, setMentioned] = createStore<InitialPushNotificationsProps>({ off: false, on: false, private: false });
  const [followRequest, setFollowRequest] = createStore<{ isRequestFollowing: boolean }>({ isRequestFollowing: false });

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  const initialValues: { name: "private" | "on" | "off"; title: string }[] = [
    { name: "off", title: "Off" },
    { name: "private", title: "From peoples i follow" },
    { name: "on", title: "From everyone" },
  ];

  const inputs: {
    title: string;
    get: InitialPushNotificationsProps;
    set: SetStoreFunction<InitialPushNotificationsProps>;
  }[] = [
    { title: "Post reactions", get: postReaction, set: setPostReaction },
    { title: "Post comments", get: postComment, set: setpostComment },
    { title: "Voted comments", get: votedComment, set: setVotedComment },
    { title: "Tagged", get: tagged, set: setTagged },
    { title: "Mentioned", get: mentioned, set: setMentioned },
  ];

  const onSubmit = (e: Event) => {
    e.preventDefault();

    toastify({ status: "success", message: "Setting has been saved" });
    mutate("auth", "pushNotifications", {
      isRequestFollowing: followRequest.isRequestFollowing,
      mentioned,
      postComment,
      postReaction,
      tagged,
      votedComment,
    });
  };

  onMount(() => {
    setFollowRequest("isRequestFollowing", auth().pushNotifications.isRequestFollowing);
    setMentioned(auth().pushNotifications.mentioned);
    setPostReaction(auth().pushNotifications.postReaction);
    setTagged(auth().pushNotifications.tagged);
    setVotedComment(auth().pushNotifications.votedComment);
    setpostComment(auth().pushNotifications.postComment);

    document.title = "Push notifications";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Push notifications";
    });
  });

  return (
    <form class="flex h-full w-full max-w-md flex-col gap-5" on:submit={onSubmit}>
      <For each={inputs}>
        {(input) => (
          <div class="flex w-full flex-col gap-2">
            <span class="text-md flex w-full flex-col">{input.title}</span>
            <div class="flex w-full flex-col gap-5 rounded-lg border border-solid border-[var(--border-primary)] p-5">
              <For each={initialValues}>
                {(option) => (
                  <InputRadio
                    {...option}
                    checked={input.get[option.name]}
                    position="left"
                    setValue={input.set}
                    value={input.get}
                  />
                )}
              </For>
            </div>
          </div>
        )}
      </For>
      <div class="flex w-full items-center gap-5 rounded-md p-3 outline outline-1 outline-[var(--border-primary)]">
        <div class="flex w-full flex-col">
          <span class="text-md">Request follow</span>
          <span class="text-xs text-[var(--text-secondary)]">
            When you activate this feature, you will receive a notification to confirm someone wants to follow you.
          </span>
        </div>
        <InputSwitcher name="isRequestFollowing" setValue={setFollowRequest} value={followRequest} />
      </div>
    </form>
  );
};

export default PagePushNotifications;
