import { Component, Match, Switch } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SvgProps } from "~/assets/icons";

const SvgNotification: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={twMerge("aspect-square size-full", props.class)}>
      <Switch>
        <Match when={props.isVisited}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 0C4.68629 0 2 2.68629 2 6V8.42925C0.844644 8.76405 0 9.83005 0 11.0933C0 12.625 1.24166 13.8667 2.77333 13.8667H5.12791C5.15665 13.9619 5.19016 14.0558 5.22836 14.1481C5.37913 14.512 5.6001 14.8427 5.87868 15.1213C6.15726 15.3999 6.48797 15.6209 6.85195 15.7716C7.21593 15.9224 7.60603 16 8 16C8.39397 16 8.78407 15.9224 9.14805 15.7716C9.51203 15.6209 9.84274 15.3999 10.1213 15.1213C10.3999 14.8427 10.6209 14.512 10.7716 14.1481C10.8098 14.0558 10.8434 13.9619 10.8721 13.8667H13.2267C14.7583 13.8667 16 12.625 16 11.0933C16 9.83005 15.1554 8.76405 14 8.42925V6C14 2.68629 11.3137 0 8 0ZM6 9.5C6 9.22386 6.22386 9 6.5 9H7.25C7.52614 9 7.75 9.22386 7.75 9.5C7.75 9.77614 7.52614 10 7.25 10H6.5C6.22386 10 6 9.77614 6 9.5ZM8.25 9.5C8.25 9.22386 8.47386 9 8.75 9H9.5C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10H8.75C8.47386 10 8.25 9.77614 8.25 9.5Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.isVisited}>
          <path
            d="M6.5 9C6.22386 9 6 9.22386 6 9.5C6 9.77614 6.22386 10 6.5 10H7.25C7.52614 10 7.75 9.77614 7.75 9.5C7.75 9.22386 7.52614 9 7.25 9H6.5Z"
            fill="currentColor"
          />
          <path
            d="M8.75 9C8.47386 9 8.25 9.22386 8.25 9.5C8.25 9.77614 8.47386 10 8.75 10H9.5C9.77614 10 10 9.77614 10 9.5C10 9.22386 9.77614 9 9.5 9H8.75Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6V8.42925C15.1554 8.76405 16 9.83005 16 11.0933C16 12.625 14.7583 13.8667 13.2267 13.8667H10.8721C10.8586 13.9114 10.844 13.9559 10.8284 14C10.8108 14.0498 10.7919 14.0992 10.7716 14.1481C10.6209 14.512 10.3999 14.8427 10.1213 15.1213C9.84274 15.3999 9.51203 15.6209 9.14805 15.7716C8.78407 15.9224 8.39397 16 8 16C7.60603 16 7.21593 15.9224 6.85195 15.7716C6.48797 15.6209 6.15726 15.3999 5.87868 15.1213C5.6001 14.8427 5.37913 14.512 5.22836 14.1481C5.20811 14.0992 5.18917 14.0498 5.17157 14C5.15597 13.9559 5.14141 13.9114 5.12791 13.8667H2.77333C1.24166 13.8667 0 12.625 0 11.0933C0 9.83005 0.844644 8.76405 2 8.42925V6ZM3 9.18061L2.27833 9.38974C1.53895 9.60399 1 10.287 1 11.0933C1 12.0727 1.79395 12.8667 2.77333 12.8667H13.2267C14.2061 12.8667 15 12.0727 15 11.0933C15 10.287 14.461 9.60399 13.7217 9.38974L13 9.18061V6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6V9.18061ZM9.41421 14.4142C9.53807 14.2904 9.64485 14.151 9.73205 14H6.26795C6.35515 14.151 6.46193 14.2904 6.58579 14.4142C6.7715 14.5999 6.99198 14.7472 7.23463 14.8478C7.47728 14.9483 7.73736 15 8 15C8.26264 15 8.52272 14.9483 8.76537 14.8478C9.00802 14.7472 9.2285 14.5999 9.41421 14.4142Z"
            fill="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgNotification;