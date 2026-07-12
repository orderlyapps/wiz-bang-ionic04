import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: (failureCount) => {
        if (typeof navigator !== "undefined" && navigator.onLine === false) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});
