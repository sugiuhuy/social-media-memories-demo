import { useMatch } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import cn from "~/utilities/cn";

interface Props {
  href: string;
}

const ExploreNavigate: ParentComponent<Props> = (props) => {
  const match = useMatch(() => (props.href === "/explore" ? props.href : `${props.href}/*?`));

  return (
    <a
      href={props.href}
      class={cn(
        "w-full border-b border-solid border-[var(--border-primary)] p-2 text-center text-[var(--text-secondary-hover)] active:text-blue-600",
        { "border-b border-solid border-blue-600 text-blue-600": Boolean(match()) },
      )}
    >
      {props.children}
    </a>
  );
};

export default ExploreNavigate;
