import { ParentComponent } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  class?: string;
}

const Legend: ParentComponent<Props> = (props) => {
  return (
    <div class={twMerge("flex w-full flex-col gap-4", props.class)}>
      <div class="relative flex w-full items-center justify-center after:absolute after:w-full after:border-t after:border-solid after:border-[var(--border-secondary)] after:content-['']">
        <span class="z-[1] bg-[var(--bg-primary)] px-3 text-[var(--text-secondary)]">{props.title}</span>
      </div>
      <div class="flex w-full flex-col items-center gap-2">{props.children}</div>
    </div>
  );
};

export default Legend;
