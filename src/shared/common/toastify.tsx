import { Component, createEffect, createSignal, For, onCleanup } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { mutateStore, selectStore } from "~/stores/manage";
import cn from "~/utilities/cn";

interface Props {
  id: number;
  status: "success" | "info" | "danger" | "warning";
  message: string;
}

const Card: Component<Props> = (props) => {
  let timeOut: number = 0;
  let elRef: HTMLDivElement | undefined;

  const mutate = mutateStore();
  const [isHide, setIsHide] = createSignal<boolean>(false);

  onCleanup(() => clearTimeout(timeOut));

  createEffect(() => {
    if (isHide()) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        elRef!.style.setProperty("display", "none");
        mutate(
          "toasts",
          produce((states) => {
            const index = states.findIndex((e) => e.id === props.id);
            if (index !== -1) states.splice(index, 1);
          }),
        );
      }, 300);
    }

    if (!isHide()) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        setIsHide(true);
      }, 5000);
    }
  });

  return (
    <div
      ref={elRef}
      class={cn(
        "group/toastify flex w-full animate-toas-show cursor-pointer select-none gap-2 rounded-lg bg-yellow-600 p-2 text-yellow-950 dark:bg-yellow-950 dark:text-yellow-50",
        {
          "bg-red-600 text-red-950 dark:bg-red-950 dark:text-red-50": props.status === "danger",
          "bg-sky-600 text-sky-950 dark:bg-sky-950 dark:text-sky-50": props.status === "info",
          "bg-green-600 text-green-950 dark:bg-green-950 dark:text-green-50": props.status === "success",
          "animate-toast-hide": isHide(),
        },
      )}
      on:click={() => setIsHide(true)}
    >
      <Icons name="alert" typeAlert={props.status} class="mt-1 aspect-square size-4 shrink-0" />
      <span class="flex h-full w-full select-none items-center">{props.message}</span>
      <Icons
        name="cross"
        class="mt-1 aspect-square size-3 shrink-0 rotate-45 opacity-50 transition-opacity group-hover/toastify:opacity-100"
      />
    </div>
  );
};

const Toastify: Component = () => {
  const toasts = selectStore((store) => store.toasts);

  return (
    <div
      class={cn("pointer-events-none fixed right-0 top-0 z-[999999] flex w-full max-w-96 flex-col gap-3 p-2", {
        "pointer-events-auto": toasts().length > 0,
      })}
    >
      <For each={toasts()}>{(toast) => <Card {...toast} />}</For>
    </div>
  );
};

export default Toastify;
