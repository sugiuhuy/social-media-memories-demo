import { useMatch } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import cn from "~/utilities/cn";

interface Props {
  href: string;
}

const ProfileNavigate: ParentComponent<Props> = (props) => {
  const match = useMatch(() => props.href);

  return (
    <a
      href={props.href}
      class={cn(
        "inline-flex w-full items-center justify-center gap-2 border-b border-solid border-[var(--border-primary)] p-2 text-[var(--text-secondary-hover)]",
        { "border-blue-600 text-[var(--text-primary)]": Boolean(match()) },
      )}
    >
      {props.children}
    </a>
  );
};

export default ProfileNavigate;
