/******************
// TODO: use redux and split related states to chunks
******************/
import { createContext, useContext } from "react";
import { TourCustomer } from "../../../API/tour/types";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { Pagination } from "../../../types/api";

type ToursQuery = UseInfiniteQueryResult<
  {
    data: Pagination<TourCustomer>;
    pageParam: any;
  },
  unknown
>;

export type ReservationsContextValue = {
  tourId: string;
  setTourId: React.Dispatch<React.SetStateAction<string>>;
  reservationsQuery: ToursQuery;
  isCanceling: boolean;
  isSelectionEnabeld: boolean;
  setIsSelectionEnabeld: React.Dispatch<React.SetStateAction<boolean>>;
  toEdit: TourCustomer | null;
  setToEdit: React.Dispatch<React.SetStateAction<TourCustomer | null>>;
  toCancelChair: string[];
  addtoCancelList: (id: string) => void;
  clearToCancelList: () => void;
  toCancel: TourCustomer | null;
  setToCancel: React.Dispatch<React.SetStateAction<TourCustomer | null>>;
  handleCancelButtonClick: () => void;
  isBusDrawerOpened: boolean;
  setIsBusDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isActionOpened: boolean;
  setIsActionOpened: React.Dispatch<React.SetStateAction<boolean>>;
  toggleToCancel: (chairNumber: string) => void;
  isRefundOpened: boolean;
  setIsRefundOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReservationsContext = createContext<ReservationsContextValue>({
  tourId: "",
  setTourId: () => {},
  reservationsQuery: {} as ToursQuery,
  isCanceling: false,
  isSelectionEnabeld: false,
  setIsSelectionEnabeld: () => {},
  toEdit: null,
  setToEdit: () => {},
  toCancelChair: [],
  addtoCancelList: (_id: string) => {},
  clearToCancelList: () => {},
  toCancel: null,
  setToCancel: () => {},
  handleCancelButtonClick: () => {},
  isBusDrawerOpened: false,
  setIsBusDrawerOpened: () => {},
  isActionOpened: false,
  setIsActionOpened: () => {},
  toggleToCancel: (_chairNumber) => {},
  isRefundOpened: false,
  setIsRefundOpened: () => {},
});

export const useReservationsContext = () => useContext(ReservationsContext);

export const ReservationsProvider = ReservationsContext.Provider;
