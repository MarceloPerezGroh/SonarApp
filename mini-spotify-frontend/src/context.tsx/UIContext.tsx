import React, { createContext, useContext, useState, ReactNode } from "react";

type UIContextType = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (message: string | null) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <UIContext.Provider value={{ isLoading, setLoading: setIsLoading, error, setError }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
