import { createEffect, createSignal, onCleanup, onMount, ParentComponent } from "solid-js";
import cn from "~/utilities/cn";

interface Props {
  class: string;
}

const NavbarContainer: ParentComponent<Props> = (props) => {
  const [isNearBottom, setIsNearBottom] = createSignal<boolean>(true);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - (scrollTop + windowHeight) <= 10) {
      setIsNearBottom(true);
    } else {
      setIsNearBottom(false);
    }
  };

  onMount(() => handleScroll());
  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      class={cn(
        "sticky bottom-0 left-0 right-0 z-[999] border-t border-solid border-[var(--border-primary)] bg-[var(--bg-primary)] backdrop-blur-xl",
        { "shadow-[0px_-10px_10px_-10px_rgba(0,_0,_0,_0.75)] shadow-neutral-300 dark:shadow-black": !isNearBottom() },
        props.class,
      )}
    >
      {props.children}
    </div>
  );
};

export default NavbarContainer;
