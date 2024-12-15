import { createSignal, onMount, ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";

const Access: ParentComponent = (props) => {
  const [isWaiting, setIsWaiting] = createSignal<boolean>(true);

  onMount(() => {
    setTimeout(() => {
      setIsWaiting(false);
    }, 1500);
  });

  return (
    <Show when={isWaiting()} fallback={props.children}>
      <div class="flex w-full flex-col gap-2 p-2">
        <div class="flex h-full w-full items-center justify-center">
          <Icons name="logo" class="aspect-square size-full max-w-16" />
        </div>
        <div class="flex w-full flex-col items-center">
          <span class="select-none text-center text-sm text-[var(--text-secondary)]">
            &#169; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
          </span>
        </div>
      </div>
    </Show>
  );
};

export default Access;
