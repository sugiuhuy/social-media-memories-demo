import { Component, createSignal, For, Match, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { MimeTypes } from "~/configurations/file";
import ManagePostContent from "~/shared/common/manage-post-content";
import ManagePostMedia from "~/shared/common/manage-post-media";
import AlertContainer from "~/shared/containers/alert";
import ModalContainer from "~/shared/containers/modal";
import PopupContainer from "~/shared/containers/popup";
import PreviewPostMediaContainer from "~/shared/containers/preview-post-media";
import { mutateStore } from "~/stores/manage";
import { UserProps } from "~/types/user-interfaces";
import { filterFiles } from "~/utilities/file/filters";
import { readFile } from "~/utilities/file/read";
import InputPostFiles from "../input/post-file";

interface Props {
  onClose: () => void;
}

const PopupCreatePost: Component<Props> = (props) => {
  const mutate = mutateStore();

  const [files, setFiles] = createStore<File[]>([]);
  const [fileOptions, setFileOptions] = createStore<{
    [key: string]: { imageEffect?: string; imageRatio?: string; taggedUsers: UserProps[] };
  }>({});
  const [value, setValue] = createStore<{
    getHtml: string;
    getText: string;
    isActiveComment: boolean;
    isActiveReaction: boolean;
  }>({ getHtml: "", getText: "", isActiveComment: true, isActiveReaction: true });

  const [isBussy, setIsBussy] = createSignal<boolean>(false);
  const [isOpenAlert, setIsOpenAlert] = createSignal<boolean>(false);
  const [tab, setTab] = createSignal<number>(0);

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  const onCloseModal = () => {
    if (isOpenAlert() || isBussy()) return;
    if (files.length > 0 && !isOpenAlert()) return setIsOpenAlert(true);

    props.onClose();
  };

  const onBack = () => {
    if (files.length > 0 && tab() === 0) return setIsOpenAlert(true);
    setTab(tab() - 1);
  };

  const onNext = () => setTab(tab() + 1);

  const onInputFiles = async (files: File[]) => {
    const fileType = filterFiles(files);
    const errorMessages = [
      "You can only upload max 10 files",
      "Ups! there something unknwon files",
      "You can only upload max 10 images",
      "You can only upload max one video",
    ];

    if (files.length > 10 || fileType.unknown > 0 || fileType.image > 10 || fileType.video > 1) {
      return toastify({
        status: "warning",
        message: errorMessages[fileType.unknown > 0 ? 1 : fileType.image > 10 ? 2 : fileType.video > 1 ? 3 : 0],
      });
    }

    for (const file of files) {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const dataUrl = await readFile(file);
        const img = new Image();
        img.src = dataUrl;
      }
    }

    setFileOptions(
      produce((state) => {
        files.forEach((file) => {
          if (MimeTypes.images.includes(file.type)) {
            const item = { imageEffect: "effect-normal", imageRatio: "cover", taggedUsers: [] };
            state[file.name] = item;
          }

          if (MimeTypes.videos.includes(file.type)) {
            const item = { taggedUsers: [] };
            state[file.name] = item;
          }
        });
      }),
    );

    setFiles(files);
  };

  const onChangeImageEffect = (payload: { fileName: string; imageEffect: string }) => {
    setFileOptions(
      produce((state) => {
        state[payload.fileName].imageEffect = payload.imageEffect;
      }),
    );
  };

  const onChangeImageRatio = (payload: { fileName: string; imageRatio: string }) => {
    setFileOptions(
      produce((state) => {
        state[payload.fileName].imageRatio = payload.imageRatio;
      }),
    );
  };

  const onTaggedUser = (payload: { fileName: string; user: UserProps }) => {
    if (!payload.fileName) return;
    setFileOptions(
      produce((state) => {
        const index = state[payload.fileName!].taggedUsers.findIndex((d) => d._id === payload.user._id);
        if (index !== -1) return state[payload.fileName!].taggedUsers.splice(index, 1);
        state[payload.fileName!].taggedUsers.push(payload.user);
      }),
    );
  };

  return (
    <>
      <ModalContainer class="flex h-full max-h-[520px] w-full max-w-md flex-col md:max-h-[620px]" onClose={onCloseModal}>
        <div class="flex w-full items-center p-3">
          <div class="flex w-full">
            <Show when={files.length > 0}>
              <button class="group/icon flex" on:click={onBack}>
                <Switch>
                  <Match when={tab() === 0}>
                    <Icons
                      name="cross"
                      class="aspect-square size-4 shrink-0 rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)]"
                    />
                  </Match>
                  <Match when={tab() === 1}>
                    <Icons
                      name="arrow"
                      class="aspect-square size-4 shrink-0 rotate-270 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)]"
                    />
                  </Match>
                </Switch>
              </button>
            </Show>
          </div>
          <div class="flex shrink-0 justify-center">
            <Show when={files.length > 0} fallback="Select files">
              <Switch>
                <Match when={tab() === 0} children={"Manage media"} />
                <Match when={tab() === 1} children={"Configurate post"} />
              </Switch>
            </Show>
          </div>
          <div class="flex w-full justify-end">
            <Switch>
              <Match when={!files.length}>
                <button class="group/icon flex justify-end" on:click={onCloseModal}>
                  <Icons
                    name="cross"
                    class="aspect-square size-4 shrink-0 rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)]"
                  />
                </button>
              </Match>
              <Match when={files.length > 0 && tab() === 0}>
                <button class="group/icon flex" on:click={onNext}>
                  <Icons
                    name="arrow"
                    class="aspect-square size-4 shrink-0 rotate-90 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)]"
                  />
                </button>
              </Match>
              <Match when={files.length > 0 && tab() === 1}>
                <button
                  class="group/submit flex justify-end text-blue-600 active:text-blue-700 disabled:cursor-not-allowed disabled:text-[var(--text-secondary-hover)]"
                  disabled={!value.getText.trim().length || !fileOptions || !files.length}
                  on:click={props.onClose}
                >
                  Share
                </button>
              </Match>
            </Switch>
          </div>
        </div>
        <Switch>
          <Match when={!files.length}>
            <InputPostFiles onInputFiles={onInputFiles} />
          </Match>
          <Match when={files.length > 0 && tab() === 0}>
            <PreviewPostMediaContainer count={files.length}>
              <For each={files}>
                {(file) => (
                  <ManagePostMedia
                    file={file}
                    fileOptions={fileOptions}
                    onChangeImageEffect={onChangeImageEffect}
                    onChangeImageRatio={onChangeImageRatio}
                    onTaggedUser={onTaggedUser}
                    setIsBussy={setIsBussy}
                  />
                )}
              </For>
            </PreviewPostMediaContainer>
          </Match>
          <Match when={files.length > 0 && tab() === 1}>
            <ManagePostContent setValue={setValue} value={value} setIsBussy={setIsBussy} />
          </Match>
        </Switch>
      </ModalContainer>
      <PopupContainer when={isOpenAlert()} noEntries>
        <AlertContainer typeAlert="warning" description="If you leave, your current progress won't be saved">
          <button
            class="flex w-full justify-center border-r border-solid border-[var(--border-secondary)] px-2 py-3 text-red-600 active:text-red-700 disabled:cursor-not-allowed disabled:text-[var(--text-secondary)]"
            on:click={() => setIsOpenAlert(false)}
          >
            Cancel
          </button>
          <button
            class="flex w-full justify-center px-2 py-3 text-sky-600 active:text-sky-700 disabled:cursor-not-allowed disabled:text-[var(--text-secondary)]"
            on:click={() => props.onClose()}
          >
            Discard
          </button>
        </AlertContainer>
      </PopupContainer>
    </>
  );
};

export default PopupCreatePost;
