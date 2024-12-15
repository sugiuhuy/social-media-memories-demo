import { ParentComponent } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mutateStore } from "~/stores/manage";

interface Props {
  class?: string;
}

const ButtonLogout: ParentComponent<Props> = (props) => {
  const mutate = mutateStore();

  return (
    <button
      class={twMerge(
        "flex w-full items-center gap-3 rounded-md p-3 text-red-600 hover:bg-[var(--bg-secondary-hover)]",
        props.class,
      )}
      on:click={() => mutate("auth", null)}
    >
      {props.children}
    </button>
  );
};

export default ButtonLogout;
