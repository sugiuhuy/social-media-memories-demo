import { debounce } from "@solid-primitives/scheduled";
import { Component, createSignal, onMount } from "solid-js";
import { reconcile } from "solid-js/store";
import { generateRandomReaction } from "~/libraries/file-images";
import { userNames } from "~/libraries/user-name-data";
import ShowCollections from "~/shared/common/show-collections";
import InputSearch from "~/shared/components/input/search";
import { mutateStore } from "~/stores/manage";

const PageCollections: Component = () => {
  const mutate = mutateStore();

  const [_, setSearch] = createSignal<string>("");
  const debounced = debounce((value: string) => setSearch(value), 1000);

  const randomCountReaction = Math.floor(Math.random() * userNames.length) + 1;
  const collections = [
    {
      _id: "collection_1",
      src: generateRandomReaction(),
      speedAnimation: 800,
      unicode: "sparklink",
      allowUsedFor: { everyone: true, followers: false },
      countUsed: randomCountReaction,
    },
  ];

  onMount(() => {
    document.title = "Collections";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Collections";
    });

    mutate("collections", reconcile(collections));
  });

  return (
    <>
      <InputSearch onDebounced={debounced} placeholder="search" class="rounded-lg bg-[var(--bg-secondary)] p-2.5" />
      <ShowCollections />
    </>
  );
};

export default PageCollections;
