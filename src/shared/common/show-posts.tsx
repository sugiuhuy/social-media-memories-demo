import { Component, For, onMount } from "solid-js";
import { produce, reconcile } from "solid-js/store";
import { twMerge } from "tailwind-merge";
import { generatePosts } from "~/libraries/post-data";
import { mutateStore, selectStore } from "~/stores/manage";
import CardPostActions from "../components/card/post-actions";
import CardPostAuthor from "../components/card/post-author";
import CardPostContent from "../components/card/post-content";
import CardPostMedia from "../components/card/post-media";
import FetchNextPage from "./fetch-next-page";

interface Props {
  class?: string;
}

const ShowPosts: Component<Props> = (props) => {
  const posts = selectStore((store) => store.posts);
  const mutate = mutateStore();

  const onGeneratePosts = () => {
    const data = generatePosts({ count: 10 });
    data.map((item) => {
      mutate(
        "posts",
        produce((states) => {
          states.push(item);
        }),
      );
    });
  };

  onMount(() => {
    const data = generatePosts({ count: 10 });
    mutate("posts", reconcile(data));
  });

  return (
    <div class={twMerge("flex h-full w-full flex-col items-center gap-3", props.class)}>
      <div class="flex w-full max-w-md flex-col gap-2 divide-y divide-solid divide-[var(--border-primary)] px-2 py-2 md:px-0">
        <For each={posts()}>
          {(post) => (
            <div class="flex w-full max-w-md flex-col gap-2 pt-2 first:pt-0">
              <CardPostAuthor {...post} />
              <CardPostMedia class="flex h-[450px] w-full justify-center md:h-[525px]" media={post.media} />
              <CardPostContent {...post} />
              <CardPostActions {...post} />
            </div>
          )}
        </For>
      </div>
      <FetchNextPage count={posts().length} limit={10} max={50} onGenerate={onGeneratePosts} />
    </div>
  );
};

export default ShowPosts;
