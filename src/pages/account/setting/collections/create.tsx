import { Component, createUniqueId, onMount, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { accept } from "~/configurations/file";
import ButtonBack from "~/shared/components/button/back";
import RadioAllowUsed from "~/shared/components/input/allow-used";
import InputSpeedAnimation from "~/shared/components/input/speed-animation";
import InputUnicode from "~/shared/components/input/unicode";
import { mutateStore } from "~/stores/manage";
import { readFile } from "~/utilities/file/read";

const PageCreateCollection: Component = () => {
  const id = createUniqueId();
  const mutate = mutateStore();

  const [errorMessage, setErrorMessage] = createStore<{ onInput: string; message: string }>({ onInput: "", message: "" });
  const [files, setFiles] = createStore<File[]>([]);
  const [value, setValue] = createStore<{ unicode: string; speedAnimation: number }>({ speedAnimation: 0, unicode: "" });
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
    toastify({ status: "success", message: "Collection as been added" });
  };

  const onInputFile = async (event: Event) => {
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

      setFiles(results);
    }

    target.value = "";
  };

  onMount(() => {
    document.title = "Create collection";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Create collection";
    });
  });

  return (
    <form class="flex h-full w-full max-w-md flex-col items-end gap-2" on:submit={onSubmit}>
      <input type="file" id={id} class="hidden" accept={accept.images} on:input={onInputFile} />
      <label for={id} class="cursor-pointer text-blue-600 active:text-blue-700">
        <Show when={files.length > 0} fallback={"Select file"}>
          Change file
        </Show>
      </label>
      <InputUnicode
        errorMessage={errorMessage}
        name="unicode"
        setValue={setValue}
        src={files.length > 0 ? URL.createObjectURL(files[0]) : null}
        value={value}
      />
      <InputSpeedAnimation errorMessage={errorMessage} max={5_000} name="speedAnimation" setValue={setValue} value={value} />
      <RadioAllowUsed allowUsedFor={allowUsedFor} setAllowUsedFor={setAllowUsedFor} />
      <div class="flex w-full gap-2">
        <ButtonBack class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-600 p-2 text-neutral-50 active:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-950 disabled:text-neutral-500">
          Cancel
        </ButtonBack>
        <button
          class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 p-2 text-neutral-50 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-500"
          disabled={!value.unicode.trim().length || !files.length}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PageCreateCollection;
