import { createContext, useContext } from "react";

export type AccountingContextValue = {
  tours: string[];
  isSelectionEnabeld: boolean;
  setIsSelectionEnabeld: React.Dispatch<React.SetStateAction<boolean>>;
  clearTours: () => void;
  toggleTour: (id: string) => void;
};

const AccountingContext = createContext<AccountingContextValue>({
  isSelectionEnabeld: false,
  setIsSelectionEnabeld: () => {},
  tours: [],
  clearTours: () => {},
  toggleTour: () => {},
});

export const useAccountingContext = () => useContext(AccountingContext);

export const AccountingProvider = AccountingContext.Provider;
