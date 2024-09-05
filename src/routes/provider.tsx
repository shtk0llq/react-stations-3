import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>{children}</CookiesProvider>
    </QueryClientProvider>
  );
}

export default Provider;
