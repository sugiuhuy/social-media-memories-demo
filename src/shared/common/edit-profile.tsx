import { Component, onMount, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { mutateStore } from "~/stores/manage";
import { AuthProps } from "~/types/user-interfaces";
import InputSwitcher from "../components/input/switcher";
import InputTextarea from "../components/input/text-area";
import InputTextSecondary from "../components/input/text-secondary";
import TooltipContainer from "../containers/tooltip";

const EditProfile: Component<AuthProps> = (props) => {
  const mutate = mutateStore();

  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [value, setValue] = createStore<{ name: string; bio: string; showSuggestions: boolean }>({
    bio: "",
    name: "",
    showSuggestions: false,
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

  const onSubmit = (e: Event) => {
    e.preventDefault();

    if (!value.name.trim().length) setErrorMessage({ onInput: "name", message: "Please enter your name" });
    else if (value.name.trim().length < 4) setErrorMessage({ onInput: "name", message: "Name must be at least 4 characters" });
    else if (value.name === props.name) setErrorMessage({ onInput: "name", message: "Name cannot be the same as before" });
    else {
      mutate("auth", "name", value.name);
      toastify({ status: "success", message: "Name changed successfully" });
    }
  };

  onMount(() => setValue({ name: props.name, bio: props.bio, showSuggestions: props.showSuggestions }));

  return (
    <div class="flex w-full flex-col rounded-md p-2 outline outline-1 outline-[var(--border-secondary)]">
      <div class="flex w-full flex-col overflow-hidden">
        <div class="flex items-center">
          <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
            <span class="truncate text-xl">{props.name}</span>
            <Show when={props.isVerified}>
              <TooltipContainer text="Account is verified" class="ml-1 flex">
                <Icons name="verified" class="aspect-square size-4 shrink-0" />
              </TooltipContainer>
            </Show>
          </div>
        </div>
        <div class="inline-flex max-w-full items-center overflow-hidden whitespace-nowrap">
          <span class="truncate text-sm text-[var(--text-secondary-hover)]">@{props.username}</span>
        </div>
      </div>
      <form class="mt-4 flex w-full flex-col items-end gap-2" on:submit={onSubmit}>
        <div class="flex w-full flex-col gap-2">
          <span class="text-lg">Display name</span>
          <InputTextSecondary
            errorMessage={errorMessage}
            name="name"
            setValue={setValue}
            type="text"
            value={value}
            maxlength={30}
          />
        </div>
        <div class="mt-2 flex w-full flex-col gap-2">
          <span class="text-lg">Bio</span>
          <InputTextarea
            errorMessage={errorMessage}
            name="bio"
            placeholder="write something about yourself..."
            setValue={setValue}
            value={value}
            maxlength={150}
          />
        </div>
        <div class="mt-2 flex w-full items-center gap-2 rounded-md bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]">
          <div class="flex w-full flex-col">
            <span class="inline-block text-sm">Show account suggestions on profiles</span>
            <span class="inline-block text-xs text-[var(--text-secondary)]">
              show suggestions for accounts you have followed.
            </span>
          </div>
          <InputSwitcher type="button" name="showSuggestions" value={value} setValue={setValue} />
        </div>
        <button
          class="inline-flex w-1/2 items-center justify-center gap-2 rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
          disabled={
            !value.name.trim().length ||
            (value.name === props.name && value.bio === props.bio && value.showSuggestions === props.showSuggestions)
          }
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
