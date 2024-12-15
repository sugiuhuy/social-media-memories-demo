import { useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import Icons from "~/assets/icons";

const PageSetting: Component = () => {
  const navigate = useNavigate();

  onMount(() => {
    document.title = "Settings";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Settings";
    });

    if (!/Android|iPhone/i.test(navigator.userAgent) && navigator.maxTouchPoints === 0) {
      navigate("/account/edit");
    }
  });

  return (
    <div class="flex h-full w-full max-w-md items-center justify-center">
      <Icons name="setting" class="aspect-square size-full max-w-16 text-[var(--text-secondary-hover)]" />
    </div>
  );
};

export default PageSetting;
