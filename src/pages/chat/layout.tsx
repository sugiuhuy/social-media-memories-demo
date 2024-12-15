import { debounce } from "@solid-primitives/scheduled";
import { RouteSectionProps } from "@solidjs/router";
import { Component, createSignal, For, onMount } from "solid-js";
import { produce, reconcile } from "solid-js/store";
import Icons from "~/assets/icons";
import { generateChatConversations } from "~/libraries/chat-data";
import FetchNextPage from "~/shared/common/fetch-next-page";
import Navbar from "~/shared/common/navbar";
import ButtonBack from "~/shared/components/button/back";
import CardChatConversation from "~/shared/components/card/chat-convesation";
import InputSearch from "~/shared/components/input/search";
import HeaderContainer from "~/shared/containers/header";
import { mutateStore, selectStore } from "~/stores/manage";
import cn from "~/utilities/cn";

const ChatLayout: Component<RouteSectionProps> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const conversations = selectStore((store) => store.chatConversations);
  const mutate = mutateStore();

  const [_, setSearch] = createSignal<string>("");
  const debounced = debounce((value: string) => setSearch(encodeURIComponent(value)), 1000);

  const onGenerateConversations = () => {
    const data = generateChatConversations(10);
    data.map((item) => {
      mutate(
        "chatConversations",
        produce((states) => {
          states.push(item);
        }),
      );
    });
  };

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  onMount(() => {
    const data = generateChatConversations(10);
    mutate("chatConversations", reconcile(data));
  });

  return (
    <div class="flex h-full w-full divide-x divide-solid divide-[var(--border-primary)]">
      <div
        class={cn(
          "top-0 flex h-dvh w-full flex-col divide-y divide-solid divide-[var(--border-primary)] max-md:sticky max-md:h-full md:max-w-80",
          { "max-md:hidden": props.params.conversation },
        )}
      >
        <HeaderContainer class="flex w-full items-center gap-3.5 p-3">
          <ButtonBack class="group/navigator flex md:hidden">
            <Icons name="arrow" class="aspect-square size-4 shrink-0 rotate-270 group-active/navigator:scale-95" />
          </ButtonBack>
          <InputSearch
            class="flex w-full gap-1 rounded-lg bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]"
            onDebounced={debounced}
            placeholder="search"
          />
          <button
            class="group/icon flex"
            on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
          >
            <Icons name="addNew" class="aspect-square size-5 shrink-0 group-active/icon:scale-95" />
          </button>
        </HeaderContainer>
        <div class="flex h-full w-full md:overflow-hidden">
          <div class="flex w-full flex-col md:overflow-auto">
            <For each={conversations()}>{(conversation) => <CardChatConversation {...conversation} />}</For>
            <FetchNextPage count={conversations().length} limit={10} max={25} onGenerate={onGenerateConversations} />
          </div>
        </div>
        <Navbar {...auth()} />
      </div>
      {props.children}
    </div>
  );
};

export default ChatLayout;
