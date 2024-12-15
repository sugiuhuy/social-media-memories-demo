import { Component, For, JSXElement, Show } from "solid-js";
import Icons from "~/assets/icons";
import { selectStore } from "~/stores/manage";
import ButtonLogout from "../components/button/logout";
import SettingNavigate from "../components/navigate/setting";

const SettingMenus: Component = () => {
  const appearUrls = selectStore((store) => store.appearUrls);

  const navigators: { name: string; links: { href: string; target?: string; children: JSXElement }[] }[] = [
    {
      name: "Configuration your account",
      links: [
        {
          href: "/account/edit",
          children: (
            <>
              <Icons name="user" typeUser="circle" class="aspect-square size-5 shrink-0" />
              <span>Edit account</span>
            </>
          ),
        },
        {
          href: "/account/password",
          children: (
            <>
              <Icons name="shield" typeShield="password" class="aspect-square size-5 shrink-0" />
              <span>Change password</span>
            </>
          ),
        },
        {
          href: "/account/privacy",
          children: (
            <>
              <Icons name="globe" class="aspect-square size-5 shrink-0" />
              <span>Privacy</span>
            </>
          ),
        },
      ],
    },
    {
      name: "How others can interact with you",
      links: [
        {
          href: "/account/manage/block",
          children: (
            <>
              <Icons name="user" typeUser="block" class="aspect-square size-5 shrink-0" />
              <span>Blocked accounts</span>
            </>
          ),
        },
        {
          href: "/account/manage/mute",
          children: (
            <>
              <Icons name="personalize" isActive={false} class="aspect-square size-5 shrink-0" />
              <span>Muted accounts</span>
            </>
          ),
        },
        {
          href: "/account/manage/personalize",
          children: (
            <>
              <Icons name="personalize" isActive={true} class="aspect-square size-5 shrink-0" />
              <span>Personalizations</span>
            </>
          ),
        },
        {
          href: "/account/manage/push_notifications",
          children: (
            <>
              <Icons name="notification" class="aspect-square size-5 shrink-0" />
              <span>Push notifications</span>
            </>
          ),
        },
        {
          href: "/account/manage/tags_mentions",
          children: (
            <>
              <Icons name="mention" class="aspect-square size-5 shrink-0" />
              <span>Tags and mentions</span>
            </>
          ),
        },
      ],
    },
    {
      name: "Reaction",
      links: [
        {
          href: "/account/collections",
          children: (
            <>
              <Icons name="gallery" typeGallery="collections" class="aspect-square size-5 shrink-0" />
              <span>Collection</span>
            </>
          ),
        },
        {
          href: "/account/collections/create",
          children: (
            <>
              <Icons name="gallery" typeGallery="addReaction" class="aspect-square size-5 shrink-0" />
              <span>Create new</span>
            </>
          ),
        },
      ],
    },
    {
      name: "More info and support",
      links: [
        {
          href: "/account/verifying",
          children: (
            <>
              <Icons name="user" typeUser="following" class="aspect-square size-5 shrink-0" isDarkMode />
              <span>Verifying account</span>
            </>
          ),
        },
        {
          href: "/account/switch_appearance",
          children: (
            <>
              <Icons name="theme" class="aspect-square size-5 shrink-0" isDarkMode />
              <span>Switch appearance</span>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <For each={navigators}>
        {(item) => (
          <div class="flex w-full flex-col">
            <span class="flex w-full px-4 pb-1.5 pt-3 text-xs text-[var(--text-secondary-hover)]">{item.name}</span>
            <For each={item.links}>
              {(link) => (
                <SettingNavigate href={link.href} target={link.target}>
                  {link.children}
                </SettingNavigate>
              )}
            </For>
            <Show when={item.name === "More info and support"}>
              <For each={appearUrls()}>
                {(exLink) => (
                  <Show when={exLink.appearAt.clientSetting}>
                    <SettingNavigate href={exLink.url} target="_blank">
                      <span class="w-full">{exLink.title}</span>
                      <Icons name="link" typeLink="blank" class="aspect-square size-5 shrink-0" />
                    </SettingNavigate>
                  </Show>
                )}
              </For>
            </Show>
          </div>
        )}
      </For>
      <div class="flex w-full border-t border-solid border-[var(--border-primary)] p-2 md:hidden">
        <ButtonLogout class="bg-red-600 p-2 text-neutral-50 hover:bg-red-700 active:bg-red-700 disabled:cursor-not-allowed">
          Logout
        </ButtonLogout>
      </div>
    </>
  );
};

export default SettingMenus;
