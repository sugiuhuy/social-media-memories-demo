import { Component, For, onMount } from "solid-js";
import { createStore, produce, SetStoreFunction } from "solid-js/store";
import InputRadio from "~/shared/components/input/radio";
import { mutateStore, selectStore } from "~/stores/manage";

const PageTagsMentions: Component = () => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  type InitialTagsMentionsProps = { private: boolean; on: boolean; off: boolean };
  const [allowTagged, setAllowTagged] = createStore<InitialTagsMentionsProps>({ off: false, on: false, private: false });
  const [allowMention, setAllowMention] = createStore<InitialTagsMentionsProps>({ off: false, on: false, private: false });

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
    description: string;
    get: InitialTagsMentionsProps;
    set: SetStoreFunction<InitialTagsMentionsProps>;
  }[] = [
    {
      description:
        "Choose who can tag you in their memories photos. When people try to tag you, they'll see if you don't allow tags from everyone.",
      title: "Who can tag you",
      get: allowTagged,
      set: setAllowTagged,
    },
    {
      description:
        "Choose who can @mention you to link your account in their memories and comments. When people try to @mention you, they'll see if you don't allow @mentions.",
      title: "Who can @mention you",
      get: allowMention,
      set: setAllowMention,
    },
  ];

  const onSubmit = (e: Event) => {
    e.preventDefault();

    toastify({ status: "success", message: "Setting has been saved" });
    mutate("auth", "allowMention", allowMention);
    mutate("auth", "allowTagged", allowTagged);
  };

  onMount(() => {
    setAllowMention(auth().allowMention);
    setAllowTagged(auth().allowTagged);

    document.title = "Tags and Mentions";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Tags and Mentions";
    });
  });

  return (
    <form class="flex h-full w-full max-w-md flex-col gap-5" on:submit={onSubmit}>
      <For each={inputs}>
        {(input) => (
          <div class="flex w-full flex-col gap-2">
            <div class="flex w-full flex-col gap-1">
              <span class="text-md">{input.title}</span>
              <span class="text-xs text-[var(--text-secondary)]">{input.description}</span>
            </div>
            <div class="flex w-full flex-col gap-5 rounded-md p-5 outline outline-1 outline-[var(--border-primary)]">
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
    </form>
  );
};

export default PageTagsMentions;
