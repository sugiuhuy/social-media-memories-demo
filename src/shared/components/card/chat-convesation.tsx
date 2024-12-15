import { useMatch } from "@solidjs/router";
import { Component, Match, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore, selectStore } from "~/stores/manage";
import { ConversationProps } from "~/types/chat-interfaces";
import cn from "~/utilities/cn";
import { moment } from "~/utilities/date-moment";
import { formatNumber } from "~/utilities/format/number";
import Avatar from "../media/avatar";

const CardChatConversation: Component<ConversationProps> = (props) => {
  const match = useMatch(() => `/chat/${props._id}`);

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
    <a
      href={`/chat/${props._id}`}
      class={cn("flex w-full items-center gap-2 p-2 hover:bg-[var(--bg-secondary)]", {
        "bg-[var(--bg-secondary)]": Boolean(match()),
      })}
      on:click={() => mutate("chatConversation", props)}
    >
      <Avatar {...props.members[0]} class="aspect-square size-10 shrink-0 rounded-full text-xl" />
      <div class="flex w-full max-w-full flex-col justify-center overflow-hidden">
        <div class="flex items-center justify-between gap-2">
          <div class="inline-flex w-full items-center overflow-hidden whitespace-nowrap">
            <Show when={props.haveMessages}>
              <div class="w-full truncate text-sm text-[var(--text-primary)]">
                <div class="m-0 inline-flex items-center p-0">
                  <span>{props.message?.sender.name}</span>
                  <Show when={props.message?.sender.isVerified}>
                    <TooltipContainer text="Account verified" class="ml-1 flex items-center justify-center">
                      <Icons name="verified" class="aspect-square size-4 shrink-0" />
                    </TooltipContainer>
                  </Show>
                </div>{" "}
                <span class="whitespace-line ml-1 inline truncate text-[var(--text-secondary)]">
                  <Show when={props.message?.media} fallback={props.message!.getText}>
                    <Switch>
                      <Match when={props.message?.media?.fileType === "image"}>attach image</Match>
                      <Match when={props.message?.media?.fileType === "video"}>attach video</Match>
                    </Switch>
                  </Show>
                </span>
              </div>
            </Show>
          </div>
          <button
            class="group/icon inline-flex"
            on:click={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toastify({ message: "This feature cannot be used on the demo version", status: "danger" });
            }}
          >
            <Icons
              name="options"
              typeOptions="3 dot horizontal"
              class="aspect-square size-5 shrink-0 group-active/icon:scale-95"
            />
          </button>
        </div>
        <div class="flex items-center justify-between gap-2">
          <div class="inline-flex max-w-full items-center gap-1 overflow-hidden whitespace-nowrap text-[var(--text-secondary-hover)]">
            <Show when={props.haveMessages}>
              <Show when={props.message!.sender._id === auth()._id}>
                <Icons
                  name="deliveried"
                  isDeliveried={props.message!.isRead}
                  class={`aspect-square size-3 shrink-0 ${props.message!.isRead ? "text-blue-600" : "text-[var(--text-primary)]"}`}
                />
              </Show>
            </Show>
            <span class="inline-flex shrink-0 text-sm text-[var(--text-secondary-hover)]">{moment(props.createdAt)}</span>
          </div>
          <Show when={props.countUnread > 0}>
            <span class="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-2 py-0.5 text-xs text-neutral-50">
              {formatNumber(props.countUnread)}
            </span>
          </Show>
        </div>
      </div>
    </a>
  );
};

export default CardChatConversation;
