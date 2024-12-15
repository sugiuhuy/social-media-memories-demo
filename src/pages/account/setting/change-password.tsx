import { Component, For, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import InputTextSecondary from "~/shared/components/input/text-secondary";
import { mutateStore } from "~/stores/manage";

const PageChangePassword: Component = () => {
  const mutate = mutateStore();

  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [value, setValue] = createStore<{ currentPassword: string; newPassword: string; confirmNewPassword: string }>({
    confirmNewPassword: "",
    currentPassword: "",
    newPassword: "",
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

  const inputs: { name: "currentPassword" | "newPassword" | "confirmNewPassword"; placeholder: string; type: "password" }[] = [
    { name: "currentPassword", placeholder: "Current password", type: "password" },
    { name: "newPassword", placeholder: "New password", type: "password" },
    { name: "confirmNewPassword", placeholder: "Confirm new password", type: "password" },
  ];

  const onSubmit = (e: Event) => {
    e.preventDefault();

    if (!value.currentPassword.trim().length)
      setErrorMessage({ onInput: "currentPassword", message: "Please enter your current password" });
    else if (!value.newPassword.trim().length)
      setErrorMessage({ onInput: "newPassword", message: "Please enter your new password" });
    else if (value.newPassword.trim().length < 6)
      setErrorMessage({ onInput: "newPassword", message: "Password must be at least 6 characters" });
    else if (!value.confirmNewPassword.trim().length)
      setErrorMessage({ onInput: "confirmNewPassword", message: "Please confirm your new password" });
    else if (value.newPassword !== value.confirmNewPassword)
      setErrorMessage({ onInput: "confirmNewPassword", message: "Passwords do not match" });
    else {
      toastify({ status: "success", message: "Change password success" });
      setValue({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    }
  };

  onMount(() => {
    document.title = "Change password";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Change password";
    });
  });

  return (
    <form
      class="flex w-full flex-col items-end gap-2 rounded-md p-2 outline outline-1 outline-[var(--border-primary)]"
      on:submit={onSubmit}
    >
      <For each={inputs}>
        {(input) => (
          <div class="flex w-full flex-col gap-2">
            <span class="text-lg">{input.placeholder}</span>
            <InputTextSecondary
              errorMessage={errorMessage}
              name={input.name}
              setValue={setValue}
              type={input.type}
              value={value}
            />
          </div>
        )}
      </For>
      <button
        class="inline-flex w-1/2 items-center justify-center gap-2 rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
        disabled={
          !value.confirmNewPassword.trim().length || !value.currentPassword.trim().length || !value.newPassword.trim().length
        }
      >
        Submit
      </button>
    </form>
  );
};

export default PageChangePassword;
