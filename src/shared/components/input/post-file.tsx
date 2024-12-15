import { Component, createSignal, createUniqueId, Show } from "solid-js";
import Icons from "~/assets/icons";
import { accept } from "~/configurations/file";

interface Props {
  onInputFiles: (files: File[]) => Promise<void>;
}

const InputPostFiles: Component<Props> = (props) => {
  const id = createUniqueId();
  const [isDragging, setIsDragging] = createSignal<boolean>(false);

  const onDragEnter = (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
    setIsDragging(false);
  };

  const onDragOver = (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
  };

  const onDrop = async (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
    setIsDragging(false);

    const target = Event.dataTransfer;
    const results: File[] = Array.from(target!.files);
    await props.onInputFiles(results);
  };

  const onInput = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const input = event.target as HTMLInputElement;
    const results: File[] = Array.from(input.files!);
    await props.onInputFiles(results);

    input.value = "";
  };

  return (
    <div
      class="flex h-full w-full flex-col items-center justify-center p-2"
      on:dragenter={onDragEnter}
      on:dragover={onDragOver}
      on:dragleave={onDragLeave}
      on:drop={onDrop}
    >
      <input type="file" name="file" id={id} class="hidden" accept={accept.all} multiple on:input={onInput} />
      <Icons
        name="gallery"
        typeGallery="all"
        class="pointer-events-none aspect-square size-full max-h-32 max-w-32 text-[var(--text-secondary)]"
      />
      <span class="tex-sm pointer-events-none mt-1 select-none text-center text-[var(--text-secondary)]">Drop files here</span>
      <Show when={!isDragging()}>
        <label
          for={id}
          class="mt-7 flex w-fit cursor-pointer select-none rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 active:bg-sky-800"
        >
          Select files
        </label>
      </Show>
    </div>
  );
};

export default InputPostFiles;
