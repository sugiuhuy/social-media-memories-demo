import { debounce } from "@solid-primitives/scheduled";
import { RouteSectionProps, useSearchParams } from "@solidjs/router";
import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import Icons from "~/assets/icons";
import Navbar from "~/shared/common/navbar";
import ButtonBack from "~/shared/components/button/back";
import InputSearch from "~/shared/components/input/search";
import ActivityNavigate from "~/shared/components/navigate/activity";
import HeaderContainer from "~/shared/containers/header";
import { selectStore } from "~/stores/manage";
import cn from "~/utilities/cn";

const ActivitiesLayout: Component<RouteSectionProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams<{ search: string }>();
  const auth = selectStore((store) => store.auth!);

  const [isNearTop, setIsNearTop] = createSignal<boolean>(true);
  const debounced = debounce((value: string) => setSearchParams({ search: encodeURIComponent(value) }), 1000);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 1) {
      setIsNearTop(false);
    } else {
      setIsNearTop(true);
    }
  };

  onMount(() => handleScroll());
  onCleanup(() => window.removeEventListener("scroll", handleScroll));
  createEffect(() => window.addEventListener("scroll", handleScroll));

  return (
    <>
      <HeaderContainer class="flex w-full flex-col items-center justify-between">
        <div class="flex w-full items-center gap-3 pt-3 max-md:px-3 md:max-w-md">
          <ButtonBack class="group/icon shrink-0 p-1 md:hidden">
            <Icons name="arrow" class="aspect-square size-4 rotate-270 group-active/icon:scale-95" />
          </ButtonBack>
          <InputSearch
            class="flex w-full gap-1 rounded-lg bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-secondary)]"
            onDebounced={debounced}
            placeholder="search"
          />
        </div>
        <div class={cn("mt-1 flex w-full max-w-md items-center shadow-none", { "shadow-ex": !isNearTop() })}>
          <ActivityNavigate href={`/activities${searchParams.search ? `?search=${searchParams.search}` : ""}`}>
            All
          </ActivityNavigate>
          <ActivityNavigate href={`/activities/user${searchParams.search ? `?search=${searchParams.search}` : ""}`}>
            Users
          </ActivityNavigate>
          <ActivityNavigate href={`/activities/post${searchParams.search ? `?search=${searchParams.search}` : ""}`}>
            Posts
          </ActivityNavigate>
        </div>
      </HeaderContainer>
      <div class="mt-0 flex h-full w-full max-w-md flex-col gap-3 px-2 py-2 md:px-0">
        <div class="w-full rounded-md bg-red-600 p-2 text-center">Keep in mind the search function will not work</div>
        <div class="flex h-full w-full flex-col items-center gap-2">{props.children}</div>
      </div>
      <Navbar {...auth()} />
    </>
  );
};

export default ActivitiesLayout;
