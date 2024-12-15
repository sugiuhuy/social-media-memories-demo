import { Component, For, onMount } from "solid-js";
import Icons from "~/assets/icons";
import generateHastags from "~/libraries/hastags";
import { moment } from "~/utilities/date-moment";
import { formatNumber } from "~/utilities/format/number";

const PageExploreHastags: Component = () => {
  const hastags = generateHastags();

  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - explore hastags`;
  });

  return (
    <div class="grid w-full grid-cols-2 gap-2 max-md:px-2">
      <For each={hastags}>
        {(hastag) => (
          <a
            href={`/explore/hastags/${decodeURIComponent(hastag.name)}`}
            class="flex w-full items-center justify-between gap-2 rounded-lg bg-[var(--bg-secondary)] p-3 outline outline-1 outline-[var(--border-secondary)] hover:outline-blue-600"
          >
            <div class="flex w-full max-w-full flex-col overflow-hidden">
              <div class="inline-flex max-w-full overflow-hidden">
                <span class="truncate">#{hastag.name}</span>
              </div>
              <div class="inline-flex max-w-full items-center gap-1 overflow-hidden text-[var(--text-secondary-hover)]">
                <Icons name="calendar" class="aspect-square size-3 shrink-0" />
                <span class="truncate text-sm">{moment(hastag.createdAt)}</span>
              </div>
            </div>
            <span class="shrink-0 text-xl">{formatNumber(hastag.count)}</span>
          </a>
        )}
      </For>
    </div>
  );
};

export default PageExploreHastags;
