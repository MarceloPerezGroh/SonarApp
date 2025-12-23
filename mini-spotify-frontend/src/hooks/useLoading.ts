//8.1

import { useState, useCallback } from "react";

export function useLoading(initialState: boolean = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading, // opcional si querés control manual
  };
}
