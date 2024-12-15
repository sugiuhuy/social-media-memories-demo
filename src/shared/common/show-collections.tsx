import { Component, For } from "solid-js";
import { selectStore } from "~/stores/manage";
import CardCollection from "../components/card/collection";

const ShowCollections: Component = () => {
  const collections = selectStore((store) => store.collections);
  return <For each={collections()}>{(collection) => <CardCollection {...collection} />}</For>;
};

export default ShowCollections;
