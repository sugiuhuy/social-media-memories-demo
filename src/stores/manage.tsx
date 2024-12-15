import { createEffect, createSignal, useContext } from "solid-js";
import { StoreContext } from "~/contexts/store-context";
import { initialStateProps } from "~/stores/states";

export function selectStore<T>(payload: (store: initialStateProps) => T) {
  const [store, _] = useContext(StoreContext);
  const [value, setValue] = createSignal<T>(payload(store));

  createEffect(() => {
    const selectedValue = payload(store);
    setValue((prevValue: T) => {
      return typeof selectedValue === "function" ? (selectedValue as (prev: T) => T)(prevValue) : selectedValue;
    });
  });

  return value;
}

export function mutateStore() {
  const [_, setStore] = useContext(StoreContext);
  return setStore;
}
