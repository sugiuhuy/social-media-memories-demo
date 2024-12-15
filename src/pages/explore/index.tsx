import { Component, onMount } from "solid-js";
import ShowPosts from "~/shared/common/show-posts";

const PageExplorePosts: Component = () => {
  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - explore`;
  });

  return <ShowPosts />;
};

export default PageExplorePosts;
