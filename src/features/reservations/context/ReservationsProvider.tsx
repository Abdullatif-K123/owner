import { ReactNode, useState } from "react";
import { ReservationsProvider as Provider } from "./ReservationsContext";

import { ReservationsContextValue } from "./ReservationsContext";
import { useParams } from "react-router-dom";
import controllers from "../../../constants/controllers";
import { useQueryClient } from "@tanstack/react-query";
import { toursQueries } from "../../../API/tour/queries";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import { TourCustomer } from "../../../API/tour/types";
import useQuerySearchParam from "../../../hooks/useQuerySearchParam";
import usePageNumberSearchParam from "../../../hooks/usePageNumberSearchParam";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";

type Props = {
  children: ReactNode;
};

const ReservationsProvider = ({ children }: Props) => {
  const { id } = useParams();
  const [tourId, setTourId] = useState(id ?? "");
  const [isSelectionEnabeld, setIsSelectionEnabeld] = useState(false);
  const [toEdit, setToEdit] = useState<TourCustomer | null>(null);
  const [toCancelChair, setToCancelChair] = useState<string[]>([]);
  const [isBusDrawerOpened, setIsBusDrawerOpened] = useState(false);
  const [isActionOpened, setIsActionOpened] = useState(false);
  const [isRefundOpened, setIsRefundOpened] = useState(false);
  const [toCancel, setToCancel] = useState<TourCustomer | null>(null);

  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const reservationsQuery = toursQueries.useCustomers({
    tourId,
    query,
    pageNumber,
  });
  const cancelReservations = toursQueries.useUnBook();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const queryClient = useQueryClient();

  const addtoCancelList = (id: string) => {
    setToCancelChair((prev) => [...prev, id]);
  };
  const clearToCancelList = () => setToCancelChair([]);

  const handleCancelButtonClick = () => {
    if (toCancelChair.length !== 0 && !(toCancel && toCancel.isPaid)) {
      cancelReservations.mutate(
        { body: toCancelChair },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([controllers.TOUR, "reservations"]);
            queryClient.invalidateQueries({
              queryKey: [controllers.TOUR, "bookedChairs", id],
              refetchType: "all",
            });
            setIsSelectionEnabeld(false);
            clearToCancelList();
            successSnackbar("تم إلغاء الحجز بنجاح");
          },
          onError: errorSnackbar,
        }
      );
    } else if (toCancelChair.length == 0) {
      setIsSelectionEnabeld((prev) => !prev);
    } else if (toCancel && toCancel.isPaid) {
      setIsRefundOpened(true);
    }
  };

  const toggleToCancel = (chairNumber: string) => {
    if (chairNumber !== toCancelChair[0]) setToCancelChair([chairNumber]);
    else setToCancelChair([]);
  };

  const value: ReservationsContextValue = {
    tourId,
    setTourId,
    reservationsQuery,
    isCanceling: cancelReservations.isLoading,
    isSelectionEnabeld,
    setIsSelectionEnabeld,
    toEdit,
    setToEdit,
    toCancelChair,
    addtoCancelList,
    clearToCancelList,
    toCancel,
    setToCancel,
    handleCancelButtonClick,
    isBusDrawerOpened,
    setIsBusDrawerOpened,
    isActionOpened,
    setIsActionOpened,
    toggleToCancel,
    isRefundOpened,
    setIsRefundOpened,
  };
  return <Provider value={value}>{children}</Provider>;
};

export default ReservationsProvider;
