import { Component, Show } from "solid-js";
import { ProfileProps } from "~/types/user-interfaces";
import transformContentPattern from "~/utilities/transform-pattern";

const CardProfileBio: Component<ProfileProps> = (props) => {
  return (
    <Show when={props.bio.trim().length > 0}>
      <div class="inline w-full max-w-md whitespace-pre-line break-words" innerHTML={transformContentPattern(props.bio)} />
    </Show>
  );
};

export default CardProfileBio;
