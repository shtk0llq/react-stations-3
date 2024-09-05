import React from "react";
import { CookiesProvider } from "react-cookie";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      {children}
    </CookiesProvider>
  );
}

export default Provider;
