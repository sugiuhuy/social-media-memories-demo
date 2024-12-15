import { Component, Match, Switch } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SvgProps } from "~/assets/icons";

const SvgEye: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 12" fill="none" class={twMerge("aspect-square size-full", props.class)}>
      <Switch>
        <Match when={props.isActive}>
          <path
            d="M10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6 4.89543 6.89543 4 8 4C8.30876 4 8.60119 4.06997 8.86228 4.19491C8.74143 4.31558 8.66667 4.48239 8.66667 4.66667C8.66667 5.03486 8.96514 5.33333 9.33333 5.33333C9.51761 5.33333 9.68442 5.25857 9.80509 5.13772C9.93003 5.39881 10 5.69124 10 6Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 6C1.16449 2.70535 4.30659 0.344879 8 0.344879C11.6934 0.344879 14.8355 2.70535 16 6C14.8355 9.29465 11.6934 11.6551 8 11.6551C4.30659 11.6551 1.16449 9.29465 0 6ZM12 6C12 8.20914 10.2091 10 8 10C5.79086 10 4 8.20914 4 6C4 3.79086 5.79086 2 8 2C10.2091 2 12 3.79086 12 6Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.isActive}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.58373 1.58373L3.65991 1.65991L5.17157 3.17157L6.58579 4.58579L9.41421 7.41421L10.8284 8.82843L12.2426 10.2426L12.4163 10.4163L12.9497 10.9497L12.2426 11.6569L11.5355 10.9497L11.4914 10.9056C10.4266 11.3871 9.24459 11.6551 8 11.6551C4.30659 11.6551 1.16449 9.29465 0 6C0.539493 4.47364 1.50345 3.14778 2.75004 2.16425L2.2457 1.65991L2.9528 0.952805L3.58373 1.58373ZM4.55382 3.96803C4.20193 4.56355 4 5.25819 4 6C4 8.20914 5.79086 10 8 10C8.74181 10 9.43645 9.79807 10.032 9.44618L8.51804 7.93226C8.35282 7.97644 8.17916 8 8 8C6.89543 8 6 7.10457 6 6C6 5.82084 6.02356 5.64718 6.06774 5.48196L4.55382 3.96803ZM7.48196 4.06774L9.93226 6.51804C9.97644 6.35282 10 6.17916 10 6C10 5.69124 9.93003 5.39881 9.80509 5.13772C9.68442 5.25857 9.51761 5.33333 9.33333 5.33333C8.96514 5.33333 8.66667 5.03486 8.66667 4.66667C8.66667 4.48239 8.74143 4.31558 8.86228 4.19491C8.60119 4.06997 8.30876 4 8 4C7.82084 4 7.64718 4.02356 7.48196 4.06774ZM12 6C12 6.74181 11.7981 7.43645 11.4462 8.03197L13.25 9.83575C14.4966 8.85223 15.4605 7.52637 16 6C14.8355 2.70535 11.6934 0.344879 8 0.344879C6.75541 0.344879 5.57343 0.612915 4.50863 1.09441L5.96803 2.55382C6.56355 2.20193 7.25819 2 8 2C10.2091 2 12 3.79086 12 6Z"
            fill="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgEye;
