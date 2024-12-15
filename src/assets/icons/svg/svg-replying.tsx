import { Component } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SvgProps } from "~/assets/icons";

const SvgReplying: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={twMerge("aspect-square size-full", props.class)}>
      <path
        d="M13.8346 11.8866L14.2405 14.2405L11.8866 13.8346L11.5695 14.023C11.3849 14.1326 11.195 14.234 11 14.3266V15.4185C11.375 15.2667 11.736 15.0872 12.0802 14.8827L15.4667 15.4667L14.8827 12.0802C15.5924 10.8856 16 9.49039 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8H0.999999C0.999999 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 9.30571 14.6434 10.5251 14.023 11.5695L13.8346 11.8866Z"
        fill="currentColor"
      />
      <path
        d="M4.8459 9.80535C4.22319 9.55965 3.53278 9.51654 2.88173 9.68272C2.23068 9.84889 1.65539 10.2151 1.24508 10.7244C0.834768 11.2338 0.612365 11.8579 0.612365 12.5H0C0 11.7295 0.266884 10.9806 0.759259 10.3693C1.25163 9.75808 1.94198 9.31867 2.72324 9.11926C3.50449 8.91985 4.33299 8.97158 5.08024 9.26642C5.79632 9.54897 6.39944 10.0397 6.80439 10.6673L7.6791 10.1862L7.44946 12.3332L5.38273 11.4492L6.27383 10.9591C5.93646 10.4426 5.43743 10.0388 4.8459 9.80535Z"
        fill="currentColor"
      />
      <path
        d="M7.11827 15.3173C6.46723 15.4835 5.77681 15.4404 5.1541 15.1946C4.56257 14.9612 4.06354 14.5574 3.72617 14.0409L4.61727 13.5508L2.55054 12.6668L2.3209 14.8138L3.19561 14.3327C3.60056 14.9603 4.20368 15.451 4.91976 15.7336C5.66701 16.0284 6.49551 16.0802 7.27676 15.8807C8.05802 15.6813 8.74837 15.2419 9.24074 14.6307C9.73312 14.0194 10 13.2705 10 12.5H9.38764C9.38764 13.1421 9.16523 13.7662 8.75492 14.2756C8.34461 14.7849 7.76932 15.1511 7.11827 15.3173Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgReplying;