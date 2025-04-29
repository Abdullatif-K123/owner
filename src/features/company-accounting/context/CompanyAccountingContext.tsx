import { createContext, useContext } from "react";

export type CompanyAccountingContextValue = {
  tours: string[];
  isSelectionEnabeld: boolean;
  setIsSelectionEnabeld: React.Dispatch<React.SetStateAction<boolean>>;
  clearTours: () => void;
  toggleTour: (id: string) => void;
  modalOpened: boolean;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setTours: React.Dispatch<React.SetStateAction<string[]>>;
};

const CompanyAccountingContext = createContext<CompanyAccountingContextValue>({
  isSelectionEnabeld: false,
  setIsSelectionEnabeld: () => {},
  tours: [],
  clearTours: () => {},
  toggleTour: () => {},
  modalOpened: false,
  setModalOpened: () => {},
  setTours: () => {},
});

export const useCompanyAccountingContext = () =>
  useContext(CompanyAccountingContext);

export const CompanyAccountingProvider = CompanyAccountingContext.Provider;
