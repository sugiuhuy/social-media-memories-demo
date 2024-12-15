import { debounce } from "@solid-primitives/scheduled";
import { Component, createEffect, createSignal, For, Match, onMount, Setter, Show, Switch } from "solid-js";
import { reconcile } from "solid-js/store";
import Icons from "~/assets/icons";
import { imageEffectOptions, MimeTypes } from "~/configurations/file";
import { generateTaggedUsers } from "~/libraries/user-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { UserProps } from "~/types/user-interfaces";
import cn from "~/utilities/cn";
import CardTaggedUsers from "../components/card/tagged-user";
import InputRadioImageRatio from "../components/input/radio-image-ratio";
import InputSearch from "../components/input/search";
import ImageEffect from "../components/media/image-effect";
import Video from "../components/media/video";
import ModalContainer from "../containers/modal";
import PopupContainer from "../containers/popup";

interface Props {
  file: File;
  fileOptions: { [key: string]: { imageEffect?: string; imageRatio?: string; taggedUsers: UserProps[] } };
  onChangeImageEffect: (payload: { fileName: string; imageEffect: string }) => void;
  onTaggedUser: (payload: { fileName: string; user: UserProps }) => void;
  onChangeImageRatio: (payload: { fileName: string; imageRatio: string }) => void;
  setIsBussy: Setter<boolean>;
}

const ManagePostMedia: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const users = selectStore((store) => store.taggedUsers);
  const mutate = mutateStore();

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [isDraggable, setIsDraggable] = createSignal<boolean>(false);
  const [isDisabled, setIsDisabled] = createSignal<boolean>(false);
  const [_, setSearch] = createSignal<string>("");
  const debounced = debounce((value: string) => setSearch(value), 1000);

  const onDragging = (event: MouseEvent) => {
    if (!isDraggable()) return;

    setIsDisabled(true);
    elRef!.scrollLeft -= event.movementX;
  };

  const onUnDragging = () => {
    setIsDraggable(false);
    setIsDisabled(false);
  };

  onMount(() => {
    const generate = generateTaggedUsers(10);
    mutate("taggedUsers", reconcile(generate));
  });

  createEffect(() => {
    if (!isOpen()) {
      props.setIsBussy(false);
    }
  });

  return (
    <>
      <div class="relative flex h-full w-full shrink-0">
        <div class="absolute top-1 z-[1] flex w-full p-2">
          <div class="flex w-full">
            <CardTaggedUsers
              size="small"
              users={props.fileOptions[props.file.name].taggedUsers}
              fileName={props.file.name}
              onTaggedUser={props.onTaggedUser}
            />
          </div>
          <div class="flex items-center gap-2">
            <button
              class={cn("flex aspect-square size-8 shrink-0 rounded-full bg-[rgba(0,0,0,0.8)] p-2 backdrop-blur-xl", {
                "bg-blue-600": props.fileOptions[props.file.name].taggedUsers!.length > 0,
              })}
              on:click={() => {
                setIsOpen(true);
                props.setIsBussy(true);
              }}
            >
              <Icons name="user" typeUser="tagged" class="text-neutral-50 group-active/icon:scale-95" />
            </button>
            <Show when={MimeTypes.images.includes(props.file.type)}>
              <InputRadioImageRatio
                fileName={props.file.name}
                ratio={props.fileOptions[props.file.name].imageRatio!}
                onChangeImageRatio={props.onChangeImageRatio}
                setIsBussy={props.setIsBussy}
              />
            </Show>
          </div>
        </div>
        <Switch>
          <Match when={MimeTypes.videos.includes(props.file.type)}>
            <Video src={URL.createObjectURL(props.file)} />
          </Match>
          <Match when={MimeTypes.images.includes(props.file.type)}>
            <ImageEffect
              effect={props.fileOptions[props.file.name].imageEffect!}
              ratio={props.fileOptions[props.file.name].imageRatio!}
              src={URL.createObjectURL(props.file)}
              isManage
            />
            <div
              ref={elRef}
              class="p-1.2 scroll-hidden-x absolute bottom-0 left-0 right-0 z-[1] flex w-full overflow-auto bg-[rgba(0,0,0,0.8)] backdrop-blur-xl"
              on:mousemove={onDragging}
              on:mousedown={() => setIsDraggable(true)}
              on:mouseup={onUnDragging}
              on:mouseleave={onUnDragging}
            >
              <div class={cn("pointer-events-auto flex gap-2 p-2", { "pointer-events-none": isDisabled() })}>
                <For each={imageEffectOptions}>
                  {(effect) => (
                    <button
                      class={cn(
                        "flex shrink-0 flex-col items-center gap-1.5 rounded-lg border border-solid border-neutral-900 bg-neutral-800 p-1.5",
                        { "border-blue-600": props.fileOptions[props.file.name].imageEffect === effect },
                      )}
                      on:click={() => props.onChangeImageEffect({ fileName: props.file.name, imageEffect: effect })}
                    >
                      <div class={`size-16 ${effect}`}>
                        <img
                          src={`${import.meta.env.VITE_CLIENT_URL}/template.png`}
                          alt={effect}
                          class="aspect-square size-full rounded-lg"
                          draggable={false}
                        />
                      </div>
                      <span class="text-xs capitalize text-neutral-50">{effect.replace("effect-", "")}</span>
                    </button>
                  )}
                </For>
              </div>
            </div>
          </Match>
        </Switch>
      </div>
      <PopupContainer when={isOpen()} noEntries>
        <ModalContainer class="flex h-3/4 w-full max-w-[400px] animate-zoom-out flex-col" onClose={() => setIsOpen(false)}>
          <div class="flex w-full flex-col">
            <div class="flex w-full items-center p-3">
              <div class="flex w-full"></div>
              <span class="flex shrink-0">Tagged users</span>
              <div class="flex w-full justify-end">
                <button class="group/icon flex" on:click={() => setIsOpen(false)}>
                  <Icons
                    name="cross"
                    class="aspect-square size-4 shrink-0 rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)]"
                  />
                </button>
              </div>
            </div>
            <InputSearch class="flex px-2 pb-2" onDebounced={debounced} placeholder="search..." />
          </div>
          <div class="flex h-full w-full flex-col gap-3 overflow-hidden p-2">
            <div class="flex h-full w-full flex-col gap-2 overflow-auto">
              <CardTaggedUsers
                size="large"
                users={users()}
                fileName={props.file.name}
                onTaggedUser={props.onTaggedUser}
                taggedUsers={props.fileOptions[props.file.name].taggedUsers}
              />
            </div>
          </div>
        </ModalContainer>
      </PopupContainer>
    </>
  );
};

export default ManagePostMedia;
