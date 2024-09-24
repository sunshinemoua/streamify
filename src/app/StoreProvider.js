"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./lib/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Ensure store is only created once tje first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
