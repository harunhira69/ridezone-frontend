"use client";

import { createContext, useContext, useState } from "react";
import GlobalLoader from "./globalLoading";


const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {loading && <GlobalLoader />}
      {children}
    </LoaderContext.Provider>
  );
}
