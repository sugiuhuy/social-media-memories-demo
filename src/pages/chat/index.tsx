import { Component, onMount } from "solid-js";
import Icons from "~/assets/icons";

const PageChat: Component = () => {
  onMount(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - chat`;
  });

  return (
    <div class="flex h-dvh w-full flex-col items-center justify-center max-md:hidden max-md:h-full">
      <Icons name="paperPlane" class="aspect-square size-full max-h-24 max-w-24 text-[var(--text-secondary-hover)]" />
    </div>
  );
};

export default PageChat;
