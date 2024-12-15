import { useMatch } from "@solidjs/router";
import { ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";
import cn from "~/utilities/cn";

interface Props {
  href: string;
  icon?: "home" | "compass" | "notification" | "paperPlane";
  placeholder: string;
  count?: number;
}

const SidebarNavigate: ParentComponent<Props> = (props) => {
  const match = useMatch(() => (props.href !== "/" ? `${props.href}/*?` : "/"));

  return (
    <a
      href={props.href}
      class={cn("relative flex shrink-0 items-center gap-2.5 rounded-lg p-3 hover:bg-[var(--border-primary)]", {
        "bg-[var(--border-primary)]": Boolean(match()),
      })}
    >
      <Show when={props.icon} fallback={props.children}>
        <Icons name={props.icon!} isVisited={Boolean(match())} class="aspect-square size-6 shrink-0" />
      </Show>
      <span class="min-w-32 shrink-0 max-xl:hidden">{props.placeholder}</span>
      <Show when={props.count! > 0}>
        <div class="absolute left-6 top-1.5 flex size-3 items-center justify-center">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
        </div>
      </Show>
    </a>
  );
};

export default SidebarNavigate;
