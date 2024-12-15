import { Component, onMount } from "solid-js";

const PageVerifyingAccount: Component = () => {
  onMount(() => {
    document.title = "Verifying account";
    document.querySelectorAll("#page-title").forEach((el) => {
      el.textContent = "Verifying account";
    });
  });

  return (
    <div class="flex h-full w-full flex-col">
      <span class="text-2xl">You're on the waitlist!</span>
      <span>
        The countdown begins for a verified badge, enchanced support, impersonation protection and even more ways to grow your
        brand.
      </span>
      <span class="mt-5">We are checking your account and previewing it</span>
      <span class="text-sm text-[var(--text-secondary-hover)]">*Notifications will be sent to your email</span>
    </div>
  );
};

export default PageVerifyingAccount;
