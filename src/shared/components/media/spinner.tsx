import { Component } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props {
  class?: string;
}

const Spinner: Component<Props> = (props) => {
  return (
    <div class={twMerge(`aspect-square size-4 shrink-0 text-[var(--text-primary)]`, props.class)}>
      <svg viewBox="25 25 50 50" fill="none" class="aspect-square size-full shrink-0 origin-center animate-spinner-rotate">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="currentColor"
          class="animate-spinner-dash"
          stroke-width="4.5"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Spinner;
