import { Component, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { mutateStore } from "~/stores/manage";
import { AuthProps } from "~/types/user-interfaces";
import InputTextSecondary from "../components/input/text-secondary";

const ChangeUsername: Component<AuthProps> = (props) => {
  const mutate = mutateStore();

  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [value, setValue] = createStore<{ username: string }>({ username: "" });

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

    if (!value.username.trim().length) setErrorMessage({ onInput: "username", message: "Please enter your username" });
    else if (value.username.trim().length < 4)
      setErrorMessage({ onInput: "username", message: "Username must be at least 4 characters" });
    else if (value.username === props.username)
      setErrorMessage({ onInput: "username", message: "Username cannot be the same as before" });
    else if (props.countChangeUsername >= 5)
      setErrorMessage({ onInput: "username", message: "You can change your username only 5 times" });
    else {
      mutate("auth", "username", value.username);
      toastify({ status: "success", message: "Username changed successfully" });
    }
  };

  onMount(() => setValue("username", props.username));

  return (
    <div class="flex w-full flex-col rounded-md p-2 outline outline-1 outline-[var(--border-secondary)]">
      <div class="flex w-full flex-col">
        <span class="text-xl">Username</span>
        <span class="text-xs text-[var(--text-secondary-hover)]">You can change your username only 5 times</span>
      </div>
      <form class="mt-4 flex w-full flex-col items-end gap-2" on:submit={onSubmit}>
        <InputTextSecondary
          errorMessage={errorMessage}
          name="username"
          setValue={setValue}
          type="text"
          value={value}
          maxlength={15}
        />
        <button
          class="inline-flex w-1/2 items-center justify-center gap-2 rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
          disabled={!value.username.trim().length || value.username === props.username || props.countChangeUsername >= 5}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangeUsername;
