import { Component, For, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { pattern } from "~/configurations/pattern";
import InputText from "~/shared/components/input/text";
import { mutateStore } from "~/stores/manage";

const PageRegister: Component = () => {
  const mutate = mutateStore();

  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [value, setValue] = createStore<{ name: string; email: string; password: string }>({ name: "", email: "", password: "" });

  const inputs: { name: "name" | "email" | "password"; type: "text" | "password"; placeholder: string; maxlength?: number }[] = [
    { name: "name", type: "text", placeholder: "Nickname", maxlength: 30 },
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

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

    if (!value.name.trim().length) setErrorMessage({ onInput: "name", message: "Please enter your nickname" });
    else if (value.name.trim().length < 4)
      setErrorMessage({ onInput: "name", message: "Nickname must be at least 4 characters" });
    else if (!value.email.trim().length) setErrorMessage({ onInput: "email", message: "Please enter your email" });
    else if (!value.email.match(pattern.email)) setErrorMessage({ onInput: "email", message: "Please enter a valid email" });
    else if (!value.password.trim().length) setErrorMessage({ onInput: "password", message: "Please enter your password" });
    else if (value.password.trim().length < 6)
      setErrorMessage({ onInput: "password", message: "Password must be at least 6 characters" });
    else toastify({ status: "success", message: "Register success" });
    setValue({ email: "", name: "", password: "" });
  };

  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - register`;
  });

  return (
    <>
      <div class="flex w-full flex-col items-center gap-4 rounded-md p-4 outline outline-0 outline-[var(--border-secondary)] md:outline-1">
        <div class="flex w-full flex-col items-center gap-2">
          <Icons name="logo" class="aspect-square size-full max-h-24 max-w-24" />
          <span class="text-center text-sm text-[var(--text-secondary)]">Meet your friends and see their memories</span>
        </div>
        <span class="w-full rounded-md bg-red-700 p-1 text-center text-sm text-neutral-50">
          please note registration does not work for the demo version!
        </span>
        <form class="flex w-full flex-col gap-3" on:submit={onSubmit}>
          <For each={inputs}>
            {(input) => <InputText {...input} messageError={errorMessage} setValue={setValue} value={value} />}
          </For>
          <div class="mt-4 inline-block w-full text-center text-xs">
            Before you click register, please follow our{" "}
            <a href="#" class="text-blue-600 active:text-blue-700">
              Privacies
            </a>{" "}
            and{" "}
            <a href="#" class="text-blue-600 active:text-blue-700">
              TOS
            </a>
          </div>
          <button
            class="w-full rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
            disabled={!value.name.trim().length || !value.email.trim().length || !value.password.trim().length}
          >
            Register
          </button>
        </form>
      </div>
      <div class="inline-block w-full rounded-md p-4 text-center outline outline-0 outline-[var(--border-secondary)] md:outline-1">
        Already have an account?{" "}
        <a href="/account/login" class="text-blue-600 active:text-blue-700">
          Login
        </a>
      </div>
    </>
  );
};

export default PageRegister;
