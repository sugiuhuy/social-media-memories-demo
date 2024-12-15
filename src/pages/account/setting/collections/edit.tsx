import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import ButtonBack from "~/shared/components/button/back";
import RadioAllowUsed from "~/shared/components/input/allow-used";
import InputSpeedAnimation from "~/shared/components/input/speed-animation";
import InputUnicode from "~/shared/components/input/unicode";
import { mutateStore, selectStore } from "~/stores/manage";

const PageEditCollection: Component = () => {
  const navigate = useNavigate();
  const collection = selectStore((store) => store.collectionDetails!);
  const mutate = mutateStore();

  const [currentValue, setCurrentValue] = createSignal<string>("");
  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [value, setValue] = createStore<{ collectionId: string; unicode: string; speedAnimation: number }>({
    collectionId: "",
    speedAnimation: 0,
    unicode: "",
  });
  const [allowUsedFor, setAllowUsedFor] = createStore<{ everyone: boolean; followers: boolean }>({
    everyone: true,
    followers: false,
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

    if (!value.unicode.trim().length) setErrorMessage({ onInput: "unicode", message: "Please enter your unicode" });
    else if (!value.speedAnimation) setErrorMessage({ onInput: "speedAnimation", message: "Please enter your speed animation" });
    else {
      toastify({ status: "success", message: "Collection as been edited" });
      mutate(
        "collections",
        (states) => states._id === collection()._id,
        produce((state) => {
          state.speedAnimation = value.speedAnimation;
          state.unicode = value.unicode;
          state.allowUsedFor = allowUsedFor;
        }),
      );

      navigate("/account/collections", { replace: true });
    }
  };

  onMount(() => {
    document.title = "Edit collection";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Edit collection";
    });
  });

  createEffect(() => {
    setValue({
      collectionId: collection()._id,
      speedAnimation: collection().speedAnimation,
      unicode: collection().unicode,
    });

    setAllowUsedFor({
      everyone: collection().allowUsedFor.everyone,
      followers: collection().allowUsedFor.followers,
    });

    setCurrentValue(
      JSON.stringify({
        collectionId: collection()._id,
        speedAnimation: collection().speedAnimation,
        unicode: collection().unicode,
        everyone: collection().allowUsedFor.everyone,
        followers: collection().allowUsedFor.followers,
      }),
    );
  });

  return (
    <form class="flex h-full w-full max-w-md flex-col items-end gap-2" on:submit={onSubmit}>
      <InputUnicode errorMessage={errorMessage} name="unicode" setValue={setValue} src={collection().src} value={value} />
      <InputSpeedAnimation errorMessage={errorMessage} max={5_000} name="speedAnimation" setValue={setValue} value={value} />
      <RadioAllowUsed allowUsedFor={allowUsedFor} setAllowUsedFor={setAllowUsedFor} />
      <div class="flex w-full gap-2">
        <ButtonBack class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-600 p-2 text-neutral-50 active:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-950 disabled:text-neutral-500">
          Cancel
        </ButtonBack>
        <button
          class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
          disabled={!value.unicode.trim().length || currentValue() === JSON.stringify({ ...value, ...allowUsedFor })}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PageEditCollection;
