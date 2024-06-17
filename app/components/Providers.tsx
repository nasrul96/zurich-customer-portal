"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@root/store/store";

interface Props {
  children: ReactNode;
}

export const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>{props.children}</Provider>
    </SessionProvider>
  );
};
