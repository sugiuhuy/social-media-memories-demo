import { Component, onMount } from "solid-js";

const PageBlockedAccounts: Component = () => {
  onMount(() => {
    document.title = "Blocked accounts";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Blocked accounts";
    });
  });

  return (
    <div class="flex h-full w-full items-center justify-center">
      <span class="text-[var(--text-secondary-hover)]">You haven't blocked anyone</span>
    </div>
  );
};

const PageMutedAccounts: Component = () => {
  onMount(() => {
    document.title = "Muted accounts";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Muted accounts";
    });
  });

  return (
    <div class="flex h-full w-full items-center justify-center">
      <span class="text-[var(--text-secondary-hover)]">You haven't muted anyone</span>
    </div>
  );
};

const PagePersonalizedAccounts: Component = () => {
  onMount(() => {
    document.title = "Personalized accounts";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Personalized accounts";
    });
  });

  return (
    <div class="flex h-full w-full items-center justify-center">
      <span class="text-[var(--text-secondary-hover)]">You haven't personalized anyone</span>
    </div>
  );
};

export { PageBlockedAccounts, PageMutedAccounts, PagePersonalizedAccounts };
