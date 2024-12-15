import { Component } from "solid-js";

const PageNotFound: Component = () => {
  return (
    <div class="flex w-full flex-col gap-2 p-2">
      <div class="flex h-full w-full flex-col items-center justify-center">
        <span class="text-7xl">404</span>
        <span class="text-sm capitalize text-[var(--text-secondary)]">Page Not Found</span>
      </div>
      <span class="w-full text-center text-sm text-[var(--text-secondary)]">
        &#169; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
      </span>
    </div>
  );
};

export default PageNotFound;
