import { ReactNode, useState } from "react";

import { CompanyAccountingProvider as Provider } from "@/features/company-accounting/context/CompanyAccountingContext";

const CompanyAccountingProvider = ({ children }: { children: ReactNode }) => {
  const [tours, setTours] = useState<string[]>([]);
  const [isSelectionEnabeld, setIsSelectionEnabeld] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const clearTours = () => setTours([]);

  const toggleTour = (id: string) => {
    if (tours.includes(id)) {
      setTours((prev) => prev.filter((tourId) => tourId !== id));
    } else {
      setTours((prev) => [...prev, id]);
    }
  };
  return (
    <Provider
      value={{
        tours,
        isSelectionEnabeld,
        setIsSelectionEnabeld,
        clearTours,
        toggleTour,
        modalOpened,
        setModalOpened,
        setTours,
      }}
    >
      {children}
    </Provider>
  );
};

export default CompanyAccountingProvider;
