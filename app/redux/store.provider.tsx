"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";

export function StoreProvider(props: PropsWithChildren) {
  return <Provider store={store}>{props.children}</Provider>;
}
