import { Component, For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import Icons from "~/assets/icons";
import { pattern } from "~/configurations/pattern";
import { generateUsers } from "~/libraries/user-data";
import { userNames } from "~/libraries/user-name-data";
import Legend from "~/shared/common/legend";
import InputText from "~/shared/components/input/text";
import { mutateStore } from "~/stores/manage";
import { AuthProps } from "~/types/user-interfaces";

const PageLogin: Component = () => {
  const mutate = mutateStore();

  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [value, setValue] = createStore<{ email: string; password: string }>({ email: "", password: "" });

  const inputs: { name: "email" | "password"; type: "text" | "password"; placeholder: string }[] = [
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const randomUserIndex = Math.floor(Math.random() * userNames.length);
    const auth = generateUsers(randomUserIndex) as AuthProps;

    if (!value.email.trim().length) setErrorMessage({ onInput: "email", message: "Please enter your email" });
    else if (!value.email.match(pattern.email)) setErrorMessage({ onInput: "email", message: "Please enter a valid email" });
    else if (value.email !== "user@email.com") setErrorMessage({ onInput: "email", message: "Email must be user@email.com" });
    else if (!value.password.trim().length) setErrorMessage({ onInput: "password", message: "Please enter your password" });
    else if (value.password !== "password") setErrorMessage({ onInput: "password", message: "Password must be password" });
    else mutate("auth", auth);
    setValue("password", "");
  };

  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - login`;
  });

  return (
    <>
      <div class="flex w-full flex-col items-center gap-4 rounded-md p-4 outline outline-0 outline-[var(--border-secondary)] md:outline-1">
        <Icons name="logo" class="aspect-square size-full max-h-24 max-w-24" />
        <span class="w-full rounded-md bg-red-700 p-1 text-center text-sm text-neutral-50">
          Please note that any data such as posts, users or user suggestions will be generated randomly on the client side and you
          cannot post any data.
        </span>
        <form class="flex w-full flex-col gap-3" on:submit={onSubmit}>
          <For each={inputs}>
            {(input) => <InputText {...input} messageError={errorMessage} setValue={setValue} value={value} />}
          </For>
          <button
            class="w-full rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
            disabled={!value.email.trim().length || !value.password.trim().length}
          >
            Login
          </button>
        </form>
        <Legend title="OR" class="mt-2">
          <a href="/account/password/forgot" class="text-blue-600 active:text-blue-700">
            Forgot password
          </a>
        </Legend>
      </div>
      <div class="inline-block w-full rounded-md p-4 text-center outline outline-0 outline-[var(--border-secondary)] md:outline-1">
        Doesn't have an account?{" "}
        <a href="/account/register" class="text-blue-600 active:text-blue-700">
          Register
        </a>
      </div>
    </>
  );
};

export default PageLogin;
