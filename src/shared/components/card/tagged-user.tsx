import { Component, For, Match, Show, Switch } from "solid-js";
import Icons from "~/assets/icons";
import CardUser from "~/shared/components/card/user";
import Avatar from "~/shared/components/media/avatar";
import TooltipContainer from "~/shared/containers/tooltip";
import { UserProps } from "~/types/user-interfaces";
import cn from "~/utilities/cn";

interface Props {
  size: "large" | "small";
  users: UserProps[];
  fileName?: string;
  onTaggedUser?: (payload: { fileName: string; user: UserProps }) => void;
  taggedUsers?: UserProps[];
}

const CardTaggedUsers: Component<Props> = (props) => {
  return (
    <For each={props.users}>
      {(user) => (
        <Switch>
          <Match when={props.size === "small"}>
            <TooltipContainer text={user.name} class="relative -ml-2 flex first:ml-0">
              <Avatar {...user} class="size-8 rounded-full text-xs outline outline-2 outline-white" />
              <Show when={props.fileName}>
                <button
                  class="group/icon absolute -left-0.5 -top-0.5 z-[2] mr-2 flex rounded-lg bg-red-600 p-1 active:bg-red-700"
                  on:click={() => props.onTaggedUser!({ fileName: props.fileName!, user })}
                >
                  <Icons name="cross" class="aspect-square size-2 rotate-45 text-neutral-50 group-active/icon:scale-95" />
                </button>
              </Show>
            </TooltipContainer>
          </Match>
          <Match when={props.size === "large"}>
            <div class="flex w-full items-center gap-2">
              <CardUser {...user} avatarSize="medium" />
              <Show when={props.fileName}>
                <button
                  class={cn("group/icon mr-2 flex rounded-lg bg-blue-600 p-1.5 active:bg-blue-700", {
                    "bg-red-600 active:bg-red-700": props.taggedUsers!.find((d) => d._id === user._id),
                  })}
                  on:click={() => props.onTaggedUser!({ fileName: props.fileName!, user })}
                >
                  <Switch>
                    <Match when={!props.taggedUsers!.find((d) => d._id === user._id)}>
                      <Icons
                        name="user"
                        typeUser="tagged"
                        class="aspect-square size-4 text-neutral-50 group-active/icon:scale-95"
                      />
                    </Match>
                    <Match when={props.taggedUsers!.find((d) => d._id === user._id)}>
                      <Icons name="cross" class="aspect-square size-4 rotate-45 text-neutral-50 group-active/icon:scale-95" />
                    </Match>
                  </Switch>
                </button>
              </Show>
            </div>
          </Match>
        </Switch>
      )}
    </For>
  );
};

export default CardTaggedUsers;
