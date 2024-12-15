import { Component, Match, Switch } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SvgProps } from "~/assets/icons";

const SvgBookmark: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 16" fill="none" class={twMerge("aspect-square size-full", props.class)}>
      <Switch>
        <Match when={props.isActive}>
          <path d="M0 0H14V16L7 10.2857L0 16V0Z" fill="currentColor" />
        </Match>
        <Match when={!props.isActive}>
          <path
            d="M6.68381 9.89838L0.5 14.9464V0.5H13.5V14.9464L7.31619 9.89838L7 9.64027L6.68381 9.89838Z"
            stroke="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgBookmark;
