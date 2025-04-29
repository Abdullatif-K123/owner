import { useEffect } from "react";
import { useSocketConnectionContext } from "../contexts/socketHubConnectionContext";
import { BookedChair } from "../API/tour/types";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "../constants/controllers";

const useRealTimeRevalidation = (tourId: string) => {
  const queryClient = useQueryClient();
  const connection = useSocketConnectionContext();
  useEffect(() => {
    if (!connection) return;
    if (tourId) {
      connection.invoke("AddToGroup", tourId);
      connection.on("getCustomersChairs", (_test: BookedChair[]) => {
        queryClient.invalidateQueries([controllers.TOUR, "reservations"]);
        queryClient.invalidateQueries([
          controllers.TOUR,
          "bookedChairs",
          tourId,
        ]);
      });
    }
    return () => {
      connection.invoke("RemoveFromGroup", tourId);
    };
  }, [connection, tourId]);
};

export default useRealTimeRevalidation;
