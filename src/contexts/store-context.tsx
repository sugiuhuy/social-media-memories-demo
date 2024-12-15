import { createContext, createEffect, JSXElement } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { initialState, initialStateProps } from "~/stores/states";

type Props = { children: JSXElement };
export const StoreContext = createContext<[get: initialStateProps, set: SetStoreFunction<initialStateProps>]>([
  initialState,
  () => {},
]);

export default function StoreContextProvider(props: Props) {
  const [store, setStore] = createStore<initialStateProps>(initialState);

  createEffect(() => {
    localStorage.setItem("theme", JSON.stringify(store.theme));
  });

  return <StoreContext.Provider value={[store, setStore]}>{props.children}</StoreContext.Provider>;
}
