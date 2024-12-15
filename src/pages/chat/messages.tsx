import { useParams } from "@solidjs/router";
import { Component, createEffect, For, onMount, Show } from "solid-js";
import { createStore, produce, reconcile } from "solid-js/store";
import Icons from "~/assets/icons";
import { generateChatMessages } from "~/libraries/chat-data";
import FetchNextPage from "~/shared/common/fetch-next-page";
import ScrollToNewMessage from "~/shared/common/scroll-to-new-message";
import ButtonBack from "~/shared/components/button/back";
import CardChatMessage from "~/shared/components/card/chat-message";
import CardUser from "~/shared/components/card/user";
import InputChatMessage from "~/shared/components/input/chat-message";
import HeaderContainer from "~/shared/containers/header";
import NavbarContainer from "~/shared/containers/navbar";
import { mutateStore, selectStore } from "~/stores/manage";

const PageChatMessages: Component = () => {
  const params: { conversation: string } = useParams();

  const auth = selectStore((store) => store.auth!);
  const chatMessages = selectStore((store) => store.chatMessages);
  const chatConversation = selectStore((store) => store.chatConversation!);
  const mutate = mutateStore();

  const [value, setValue] = createStore<{ chatConversationId: string; getHtml: string; getText: string }>({
    chatConversationId: "",
    getHtml: "",
    getText: "",
  });

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  const onGenerateMessages = () => {
    const data = generateChatMessages({ count: 10, includes: [chatConversation().members[0]._id, auth()._id] });
    data.map((item) => {
      mutate(
        "chatMessages",
        produce((states) => {
          states.push(item);
        }),
      );
    });
  };

  const onSubmit = () => {
    toastify({ status: "danger", message: "This feature cannot be used on the demo version" });
    setValue(
      produce((state) => {
        state.getHtml = "";
        state.getText = "";
      }),
    );
  };

  const onInputFile = (e: Event) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;
    target.value = "";
    toastify({ status: "danger", message: "This feature cannot be used on the demo version" });
  };

  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - chat messages`;
    setValue("chatConversationId", chatConversation()._id);
  });

  createEffect(() => {
    if (params.conversation) {
      const data = generateChatMessages({ count: 10, includes: [chatConversation().members[0]._id, auth()._id] });
      mutate("chatMessages", reconcile(data));
    }
  });

  return (
    <div class="flex h-dvh w-full flex-col divide-y divide-solid divide-[var(--border-primary)] max-md:h-full">
      <HeaderContainer class="flex w-full items-center gap-3 p-2">
        <ButtonBack class="group/navigator flex md:hidden">
          <Icons name="arrow" class="aspect-square size-4 shrink-0 rotate-270 group-active/navigator:scale-95" />
        </ButtonBack>
        <div class="flex w-full items-center gap-2">
          <Show when={chatConversation().members[0]} fallback={<div class="w-full"></div>}>
            <CardUser {...chatConversation().members[0]} avatarSize="medium" isNavigate>
              <span class="truncate text-xs text-[var(--text-secondary-hover)]">@{chatConversation().members[0].username}</span>
            </CardUser>
          </Show>
          <button class="group/icon inline-flex" on:click={onSubmit}>
            <Icons
              name="options"
              typeOptions="3 dot horizontal"
              class="aspect-square size-5 shrink-0 group-active/icon:scale-95"
            />
          </button>
        </div>
      </HeaderContainer>
      <div class="relative flex h-full w-full items-center justify-center md:overflow-hidden">
        <div class="flex h-full w-full items-end">
          <div class="flex h-full w-full flex-col-reverse p-2 md:overflow-auto">
            <ScrollToNewMessage when={chatMessages().length} />
            <div class="flex w-full flex-col-reverse gap-5">
              <For each={chatMessages()}>{(message) => <CardChatMessage {...message} />}</For>
            </div>
            <FetchNextPage count={chatMessages().length} limit={10} max={25} onGenerate={onGenerateMessages} />
          </div>
        </div>
      </div>
      <NavbarContainer class="flex w-full items-center gap-3 p-2">
        <InputChatMessage
          onInputFile={onInputFile}
          onSubmit={onSubmit}
          setValue={setValue}
          value={value}
          conversation={chatConversation()}
        />
      </NavbarContainer>
    </div>
  );
};

export default PageChatMessages;
