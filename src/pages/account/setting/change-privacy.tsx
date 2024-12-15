import { Component, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import InputSwitcher from "~/shared/components/input/switcher";
import { mutateStore, selectStore } from "~/stores/manage";

const PageChangePrivacy: Component = () => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();
  const [value, setValue] = createStore<{ isPrivate: boolean }>({ isPrivate: false });

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();

    toastify({ status: "success", message: "Change privacy success" });
    mutate("auth", "isPrivate", value.isPrivate);
  };

  onMount(() => {
    setValue("isPrivate", auth().isPrivate);
    document.title = "Privacy";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Privacy";
    });
  });

  return (
    <form
      class="flex w-full items-center gap-2 rounded-md p-2 outline outline-1 outline-[var(--border-secondary)]"
      on:submit={onSubmit}
    >
      <div class="flex w-full flex-col">
        <span class="text-md">Private account</span>
        <div class="flex w-full flex-col">
          <span class="text-xs text-[var(--text-secondary)]">
            When your account is public, Anyone can see your profile, memories and comments, including mentions and tags in photos
            and videos
          </span>
          <span class="text-xs text-[var(--text-secondary)]">
            When your account is private, Only someone who follows you can see your profile, memories and comments, including
            mentions and tags in photos and videos
          </span>
        </div>
      </div>
      <InputSwitcher name="isPrivate" value={value} setValue={setValue} />
    </form>
  );
};

export default PageChangePrivacy;
