import { Component, createUniqueId } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import { accept } from "~/configurations/file";
import { ConversationProps } from "~/types/chat-interfaces";
import Tiptap from "./tiptap";

interface Props {
  value: { chatConversationId: string; getHtml: string; getText: string };
  setValue: SetStoreFunction<{ chatConversationId: string; getHtml: string; getText: string }>;
  onSubmit: () => void;
  onInputFile: (e: Event) => void;
  conversation: ConversationProps;
}

const InputChatMessage: Component<Props> = (props) => {
  const id = createUniqueId();

  return (
    <>
      <div class="flex h-full items-end">
        <input type="file" name="file" id={id} class="hidden" multiple={false} accept={accept.all} on:input={props.onInputFile} />
        <label for={id} class="active:text-secondary group/icon pointer-events-auto mb-2 flex cursor-pointer">
          <Icons name="gallery" typeGallery="all" class="aspect-square size-5 group-active/icon:scale-95" />
        </label>
      </div>
      <div class="flex max-h-32 w-full cursor-auto overflow-hidden rounded-lg bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-primary)]">
        <div class="pointer-events-auto flex h-full max-h-32 w-full overflow-hidden">
          <div class="flex h-full max-h-32 w-full overflow-hidden">
            <div class="h-full max-h-32 w-full overflow-auto">
              <Tiptap
                value={props.value}
                setValue={props.setValue}
                maxlength={150}
                placeholder="write message..."
                autoFocus={false}
                clearContent={!props.value.getText.trim().length}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex h-full items-end">
        <button
          class="enabled:group/icon mb-2 flex shrink-0 disabled:cursor-not-allowed disabled:text-[var(--text-secondary-hover)]"
          disabled={!props.value.chatConversationId.trim().length || !props.value.getText.trim().length}
          on:click={props.onSubmit}
        >
          <Icons name="paperPlane" class="aspect-square size-5 shrink-0 group-active/icon:scale-95" />
        </button>
      </div>
    </>
  );
};

export default InputChatMessage;
