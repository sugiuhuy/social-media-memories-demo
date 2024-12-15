import { createEffect, createSignal, onCleanup, onMount, ParentComponent } from "solid-js";
import cn from "~/utilities/cn";

interface Props {
  class: string;
}

const HeaderContainer: ParentComponent<Props> = (props) => {
  const [isNearTop, setIsNearTop] = createSignal<boolean>(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 1) {
      setIsNearTop(false);
    } else {
      setIsNearTop(true);
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
        "sticky left-0 right-0 top-0 z-[999] border-solid border-[var(--border-primary)] bg-[var(--bg-primary)] backdrop-blur-xl max-md:border-b",
        { "shadow-ex shadow-neutral-300 dark:shadow-black": !isNearTop() },
        props.class,
      )}
    >
      {props.children}
    </div>
  );
};

export default HeaderContainer;
