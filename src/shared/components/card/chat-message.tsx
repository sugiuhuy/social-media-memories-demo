import { Component, createSignal, Match, onMount, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore, selectStore } from "~/stores/manage";
import { MessageProps } from "~/types/chat-interfaces";
import cn from "~/utilities/cn";
import { moment } from "~/utilities/date-moment";
import transformContentPattern from "~/utilities/transform-pattern";

const CardChatMessage: Component<MessageProps> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();
  const [isOwnMessage, setIsOwnMessage] = createSignal<boolean>(false);

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  onMount(() => setIsOwnMessage(props.sender._id === auth()._id));

  return (
    <div class={cn("flex w-full", { "flex-row-reverse": isOwnMessage() })}>
      <div class={cn("flex w-full flex-col items-start", { "items-end": isOwnMessage() })}>
        <div
          class={cn("flex max-w-[75%] flex-col gap-2 rounded-lg bg-blue-600 p-2", {
            "bg-[var(--bg-secondary)]": !isOwnMessage(),
          })}
        >
          <Switch>
            <Match when={props.getHtml}>
              <div innerHTML={transformContentPattern(props.getHtml!)} />
            </Match>
            <Match when={props.media}>
              <Switch>
                <Match when={props.media?.fileType === "image"}>
                  <picture draggable={false} class="pointer-events-none">
                    <source srcset={`${props.media!.src}.avif`} type="image/avif" class="h-full max-h-md" />
                    <source srcset={`${props.media!.src}.webp`} type="image/webp" class="h-full max-h-md" />
                    <img src={`${props.media!.src}.jpeg`} alt="avatar" class="h-full max-h-md" />
                  </picture>
                </Match>
                <Match when={props.media?.fileType === "video"}>
                  <video src={props.media?.src} controls />
                </Match>
              </Switch>
            </Match>
          </Switch>
        </div>
        <div class={cn("mt-1 flex gap-2", { "mt-2": isOwnMessage() })}>
          <Show when={props.sender._id === auth()._id}>
            <TooltipContainer text={props.isRead ? "Read" : "Delivered"} class="flex w-fit">
              <Icons
                name="deliveried"
                isDeliveried={props.isRead}
                class={cn("aspect-square size-4 shrink-0 text-[var(--text-secondary)]", { "text-blue-600": props.isRead })}
              />
            </TooltipContainer>
          </Show>
          <span class="text-xs text-[var(--text-secondary-hover)]">{moment(props.createdAt)}</span>
          <Show when={props.sender._id === auth()._id}>
            <button
              class="group/icon ml-2 flex shrink-0 text-rose-600"
              on:click={() => toastify({ status: "danger", message: "This feature cannot be used on the demo version" })}
            >
              <Icons name="trash" class="aspect-square size-4 shrink-0 group-active/icon:scale-95" />
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default CardChatMessage;
