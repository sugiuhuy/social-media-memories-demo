import { Component, Show } from "solid-js";
import Icons from "~/assets/icons";
import { accept } from "~/configurations/file";
import TooltipContainer from "~/shared/containers/tooltip";
import { mutateStore } from "~/stores/manage";
import { AuthProps } from "~/types/user-interfaces";
import { readFile } from "~/utilities/file/read";
import Avatar from "../media/avatar";

const UploadAvatar: Component<AuthProps> = (props) => {
  const mutate = mutateStore();

  const onInput = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const results: File[] = Array.from(target.files);
      for (const file of results) {
        if (file.type.startsWith("image/")) {
          const dataUrl = await readFile(file);
          const img = new Image();
          img.src = dataUrl;
        }
      }

      mutate("auth", "avatar", URL.createObjectURL(results[0]));
    }

    target.value = "";
  };

  return (
    <div class="flex w-full items-center gap-2 rounded-md bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]">
      <input id="avatar" type="file" class="hidden" multiple={false} accept={accept.images} on:input={onInput} />
      <div class="relative">
        <Avatar avatar={props.avatar} display={props.display} class="flex size-14 rounded-full text-4xl" />
      </div>
      <div class="flex w-full max-w-full flex-col overflow-hidden">
        <div class="flex items-center">
          <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
            <span class="truncate">{props.name}</span>
            <Show when={props.isVerified}>
              <TooltipContainer text="Account is verified" class="ml-1 flex">
                <Icons name="verified" class="aspect-square size-4 shrink-0" />
              </TooltipContainer>
            </Show>
          </div>
        </div>
        <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
          <span class="truncate text-sm text-[var(--text-secondary-hover)] max-md:hidden">@{props.username}</span>
          <label for="avatar" class="cursor-pointer truncate text-sm text-blue-600 active:text-blue-700 md:hidden">
            Change avatar
          </label>
        </div>
      </div>
      <label
        for="avatar"
        class="shrink-0 cursor-pointer select-none rounded-md bg-blue-600 p-2 text-sm text-neutral-50 active:bg-blue-700 max-md:hidden"
      >
        Change avatar
      </label>
    </div>
  );
};

export default UploadAvatar;
