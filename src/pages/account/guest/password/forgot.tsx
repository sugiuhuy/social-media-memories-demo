import { Component, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { pattern } from "~/configurations/pattern";
import InputText from "~/shared/components/input/text";
import { mutateStore } from "~/stores/manage";

const PageForgotPassword: Component = () => {
  const mutate = mutateStore();

  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [value, setValue] = createStore<{ email: string }>({ email: "" });

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

    if (!value.email.trim().length) setErrorMessage({ onInput: "email", message: "Please enter your email" });
    else if (!value.email.match(pattern.email)) setErrorMessage({ onInput: "email", message: "Please enter a valid email" });
    else toastify({ status: "success", message: "Forgot password success" });
    setValue("email", "");
  };

  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - password forgot`;
  });

  return (
    <>
      <div class="flex w-full flex-col items-center gap-4 rounded-md p-4 outline outline-0 outline-[var(--border-secondary)] md:outline-1">
        <div class="flex w-full flex-col items-center gap-2">
          <Icons name="private" class="aspect-square size-full max-h-24 max-w-24" />
          <span class="text-center text-sm text-[var(--text-secondary)]">
            Enter your email address and we will send you a link to reset your password
          </span>
        </div>
        <span class="w-full rounded-md bg-red-700 p-1 text-center text-sm text-neutral-50">
          please note the request to forget password does not work for the demo version!
        </span>
        <form class="flex w-full flex-col gap-3" on:submit={onSubmit}>
          <InputText messageError={errorMessage} name="email" placeholder="Email" setValue={setValue} type="text" value={value} />
          <button
            class="w-full rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
            disabled={!value.email.trim().length}
          >
            Submit
          </button>
        </form>
      </div>
      <div class="inline-block w-full rounded-md p-4 text-center outline outline-0 outline-[var(--border-secondary)] md:outline-1">
        <a href="/account/login" class="text-blue-600 active:text-blue-700">
          Already remember password
        </a>
      </div>
    </>
  );
};

export default PageForgotPassword;
