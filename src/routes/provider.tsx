import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../stores/store";

const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default Provider;
