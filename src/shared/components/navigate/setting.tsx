import { useMatch } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import cn from "~/utilities/cn";

interface Props {
  href: string;
  target?: string;
}

const SettingNavigate: ParentComponent<Props> = (props) => {
  const match = useMatch(() => props.href);

  return (
    <a
      href={props.href}
      class={cn(
        "flex w-full items-center gap-3 p-4 no-underline hover:bg-[var(--bg-primary-hover)] active:bg-[var(--bg-primary-hover)]",
        { "bg-[var(--border-primary)]": Boolean(match()) },
      )}
      target={props.target}
    >
      {props.children}
    </a>
  );
};

export default SettingNavigate;
