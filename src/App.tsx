import { RouteSectionProps } from "@solidjs/router";
import { Component, createEffect, onMount } from "solid-js";
import Access from "./shared/common/access";
import Toastify from "./shared/common/toastify";
import { selectStore } from "./stores/manage";

const App: Component<RouteSectionProps> = (props) => {
  const theme = selectStore((store) => store.theme);

  onMount(() => {
    document.title = import.meta.env.VITE_APP_NAME;
  });

  createEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mediaQuery.matches ? "dark" : "light";
    document.documentElement.className = theme() === "auto" ? systemTheme : theme();
  });

  return (
    <Access>
      <Toastify />
      {props.children}
    </Access>
  );
};

export default App;
