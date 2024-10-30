import { createContext, useContext } from "react";

// Create and export the context
export const LoadingContext = createContext<
  | {
      isLoading: boolean;
      startLoading: () => void;
      endLoading: () => void;
    }
  | undefined
>(undefined);

LoadingContext.displayName = "LoadingContext";

// Custom hook for using the context
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
