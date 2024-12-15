import { Component, For } from "solid-js";
import { selectStore } from "~/stores/manage";

const AppearUrls: Component = () => {
  const appearUrls = selectStore((store) => store.appearUrls);

  return (
    <div class="inline-flex flex-wrap items-center gap-2 text-sm">
      <For each={appearUrls().filter((i) => i.appearAt.footerNavigation)}>
        {(item) => (
          <a href={item.url} class="text-blue-600 active:text-blue-700">
            {item.title}
          </a>
        )}
      </For>
    </div>
  );
};

export default AppearUrls;
