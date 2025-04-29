import { ReactNode, useState } from "react";

import { GeneralBoxesProvider as Provider } from "@/features/GeneralBoxes/context/GeneralBoxesContext";

const GeneralBoxesProvider = ({ children }: { children: ReactNode }) => {
  const [boxes, setBoxes] = useState<string[]>([]);
  const [isSelectionEnabeld, setIsSelectionEnabeld] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const clearBoxes = () => setBoxes([]);

  const toggleBox = (id: string) => {
    if (boxes.includes(id)) {
      setBoxes((prev) => prev.filter((boxId) => boxId !== id));
    } else {
      setBoxes((prev) => [...prev, id]);
    }
  };
  return (
    <Provider
      value={{
        boxes,
        isSelectionEnabeld,
        setIsSelectionEnabeld,
        clearBoxes,
        toggleBox,
        modalOpened,
        setModalOpened,
        setBoxes,
      }}
    >
      {children}
    </Provider>
  );
};

export default GeneralBoxesProvider;
