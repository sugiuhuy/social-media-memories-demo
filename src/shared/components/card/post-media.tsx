import { Component, For, Match, Switch } from "solid-js";
import ImageEffect from "~/shared/components/media/image-effect";
import Video from "~/shared/components/media/video";
import SwiperContainer from "~/shared/containers/swiper";
import { PostMediaProps } from "~/types/post-interfaces";
import { UserProps } from "~/types/user-interfaces";
import CardTaggedUsers from "./tagged-user";

interface Props {
  media: PostMediaProps<{ taggedUsers: UserProps[] }>[];
  class: string;
}

const CardPostMedia: Component<Props> = (props) => {
  return (
    <SwiperContainer count={props.media.length} class={props.class} rounded="md">
      <For each={props.media}>
        {(media) => (
          <div class="relative flex h-full w-full shrink-0">
            <div class="absolute top-1 z-[1] flex w-full p-2">
              <CardTaggedUsers size="small" users={media.taggedUsers} />
            </div>
            <Switch>
              <Match when={media.fileType === "image"}>
                <ImageEffect effect={media.imageEffect} ratio={media.imageRatio} src={media.src} isCencored={media.isCencored} />
              </Match>
              <Match when={media.fileType === "video"}>
                <Video src={media.src} isCencored={media.isCencored} />
              </Match>
            </Switch>
          </div>
        )}
      </For>
    </SwiperContainer>
  );
};

export default CardPostMedia;
