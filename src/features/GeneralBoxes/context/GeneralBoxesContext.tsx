import { createContext, useContext } from "react";

export type GeneralBoxesContextValue = {
  boxes: string[];
  isSelectionEnabeld: boolean;
  setIsSelectionEnabeld: React.Dispatch<React.SetStateAction<boolean>>;
  clearBoxes: () => void;
  toggleBox: (id: string) => void;
  modalOpened: boolean;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setBoxes: React.Dispatch<React.SetStateAction<string[]>>;
};

const GeneralBoxesContext = createContext<GeneralBoxesContextValue>({
  isSelectionEnabeld: false,
  setIsSelectionEnabeld: () => {},
  boxes: [],
  clearBoxes: () => {},
  toggleBox: () => {},
  modalOpened: false,
  setModalOpened: () => {},
  setBoxes: () => {},
});

export const useGeneralBoxesContext = () => useContext(GeneralBoxesContext);

export const GeneralBoxesProvider = GeneralBoxesContext.Provider;
