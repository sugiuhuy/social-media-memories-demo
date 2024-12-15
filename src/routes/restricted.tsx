import { Navigate, RouteSectionProps } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { selectStore } from "~/stores/manage";

const Restricted: Component<RouteSectionProps> = (props) => {
  const auth = selectStore((store) => store.auth);

  return (
    <div class="flex w-full flex-col items-center justify-center gap-2">
      <Show when={!auth()} fallback={<Navigate href="/" />}>
        {props.children}
      </Show>
    </div>
  );
};

export default Restricted;
