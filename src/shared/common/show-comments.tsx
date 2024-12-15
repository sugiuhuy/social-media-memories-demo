import { Component, For, onMount, Setter, Show } from "solid-js";
import { produce, reconcile } from "solid-js/store";
import { generateComments } from "~/libraries/post-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { CommentProps } from "~/types/post-interfaces";
import CardComment from "../components/card/comment";
import FetchNextPage from "./fetch-next-page";

interface Props {
  postId: string;
  maxComments: number;
  setReplyingComment: Setter<CommentProps | null>;
}

const ShowComments: Component<Props> = (props) => {
  const comments = selectStore((store) => store.postComments);
  const mutate = mutateStore();

  const onGenerateComments = () => {
    const data = generateComments(10);
    data.map((item) => {
      mutate(
        "postComments",
        produce((states) => {
          states.push(item);
        }),
      );
    });
  };

  onMount(() => {
    const data = generateComments(10);
    mutate("postComments", reconcile(data));
  });

  return (
    <>
      <div class="flex w-full flex-col gap-4">
        <For each={comments()}>{(comment) => <CardComment {...comment} setReplyingComment={props.setReplyingComment} />}</For>
      </div>
      <Show when={comments().length >= 10}>
        <div class="mt-3 flex w-full">
          <FetchNextPage count={comments().length} limit={10} max={props.maxComments} onGenerate={onGenerateComments} />
        </div>
      </Show>
    </>
  );
};

export default ShowComments;
