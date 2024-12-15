import { Component, createSignal } from "solid-js";
import Icons from "~/assets/icons";
import { AuthProps } from "~/types/user-interfaces";
import Avatar from "../components/media/avatar";
import NavbarNavigate from "../components/navigate/navbar";
import PopupCreatePost from "../components/popup/create-post";
import NavbarContainer from "../containers/navbar";
import PopupContainer from "../containers/popup";

const Navbar: Component<AuthProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  return (
    <>
      <NavbarContainer class="flex w-full justify-around gap-2 p-2 md:hidden">
        <NavbarNavigate href="/" icon="home" />
        <NavbarNavigate href="/explore" icon="compass" />
        <button
          class="flex aspect-square shrink-0 rounded-lg p-3 active:bg-[var(--border-primary)]"
          on:click={() => setIsOpen(true)}
        >
          <Icons name="addNew" class="aspect-square size-6 shrink-0" />
        </button>
        <NavbarNavigate href="/activities" icon="notification" count={props.countUnreadNotifications} />
        <NavbarNavigate href={`/@${props.username}`}>
          <Avatar {...props} class="aspect-square size-6 shrink-0 rounded-full text-sm" />
        </NavbarNavigate>
      </NavbarContainer>
      <PopupContainer when={isOpen()}>
        <PopupCreatePost onClose={() => setIsOpen(false)} />
      </PopupContainer>
    </>
  );
};

export default Navbar;
