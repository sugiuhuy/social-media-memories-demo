import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";
import AppearUrls from "~/shared/common/appear-urls";

const GuestLayout: Component<RouteSectionProps> = (props) => {
  return (
    <>
      <div class="flex h-full w-full max-w-96 flex-col items-center justify-center gap-5 p-2">{props.children}</div>
      <div class="flex w-full flex-col items-center gap-0.5 p-2">
        <AppearUrls />
        <span class="text-sm text-[var(--text-secondary)]">
          &#169; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
        </span>
      </div>
    </>
  );
};

export default GuestLayout;
