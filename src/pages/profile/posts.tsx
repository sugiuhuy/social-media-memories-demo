import { Component } from "solid-js";
import ShowPosts from "~/shared/common/show-posts";

const PageProfilePosts: Component = () => <ShowPosts />;
const PageProfileTaggedPosts: Component = () => <ShowPosts />;
const PageProfileSavedPosts: Component = () => <ShowPosts />;

export { PageProfilePosts, PageProfileTaggedPosts, PageProfileSavedPosts };
