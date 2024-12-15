import { onMount, ParentComponent } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { mutateStore } from "~/stores/manage";
import Tiptap from "./tiptap";

interface Props {
  postId: string;
}

const InputPostComment: ParentComponent<Props> = (props) => {
  const mutate = mutateStore();
  const [value, setValue] = createStore<{ postId: string; replyingAt: string | null; getHtml: string; getText: string }>({
    getHtml: "",
    getText: "",
    postId: "",
    replyingAt: null,
  });

  const toastify = ({ status, message }: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;
        states.unshift({ id, status, message });
      }),
    );
  };

  const onSubmit = () => {
    setValue(
      produce((state) => {
        state.getHtml = "";
        state.getText = "";
        state.replyingAt = null;
      }),
    );

    toastify({ status: "danger", message: "This feature cannot be used on the demo version" });
  };

  onMount(() => setValue("postId", props.postId));

  return (
    <>
      {props.children}
      <div class="flex w-full items-center gap-3">
        <div class="flex max-h-32 w-full cursor-auto overflow-hidden rounded-lg bg-[var(--bg-secondary)] p-2 outline outline-1 outline-[var(--border-primary)]">
          <div class="pointer-events-auto flex h-full max-h-32 w-full overflow-hidden">
            <div class="flex h-full max-h-32 w-full overflow-hidden">
              <div class="h-full max-h-32 w-full overflow-auto">
                <Tiptap
                  value={value}
                  setValue={setValue}
                  maxlength={150}
                  placeholder="write comment..."
                  autoFocus={false}
                  clearContent={!value.getText.trim().length}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex h-full items-end">
          <button
            class="enabled:group/icon mb-2 flex shrink-0 disabled:cursor-not-allowed disabled:text-[var(--text-secondary-hover)]"
            disabled={!value.postId.trim().length || !value.getText.trim().length}
            onclick={onSubmit}
          >
            <Icons name="paperPlane" class="aspect-square size-5 shrink-0 group-active/icon:scale-95" />
          </button>
        </div>
      </div>
    </>
  );
};

export default InputPostComment;
