import { Component } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SvgProps } from "~/assets/icons";

const SvgArrow: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 8" fill="none" class={twMerge("aspect-square size-full", props.class)}>
      <path
        d="M13 6.99999L7.17678 1.17677C7.07915 1.07914 6.92086 1.07914 6.82322 1.17677L1 6.99999"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default SvgArrow;
