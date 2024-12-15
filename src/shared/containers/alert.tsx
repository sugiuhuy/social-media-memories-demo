import { onMount, ParentComponent } from "solid-js";
import Icons from "~/assets/icons";

interface Props {
  description: string;
  typeAlert: "info" | "danger" | "help" | "success" | "warning";
}

const AlertContainer: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const colors = {
    info: "#0891b2",
    danger: "#dc2626",
    help: "#0284c7",
    success: "#16a34a",
    warning: "#ca8a04",
  };

  onMount(() => {
    elRef!.style.setProperty("--alert-icon-color", colors[props.typeAlert]);
  });

  return (
    <div class="flex w-full max-w-96 animate-zoom-in flex-col divide-y divide-solid divide-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] outline outline-1 outline-[var(--border-secondary)]">
      <div ref={elRef} class="flex w-full flex-col items-center gap-2 p-3">
        <Icons name="alert" typeAlert={props.typeAlert} class="aspect-square size-16 text-[var(--alert-icon-color)]" />
        <div class="flex w-full items-center justify-center">
          <span class="text-center text-[var(--text-primary)]">{props.description}</span>
        </div>
      </div>
      <div class="flex w-full divide-x divide-solid divide-[var(--border-secondary)]">{props.children}</div>
    </div>
  );
};

export default AlertContainer;
