import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { API } from "./apis";
import controllers from "../../constants/controllers";
import bussesAPI from "../busses/apis";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import { TourGetCustomersParams, ToursGetAllParams } from "./types";

export const toursQueries = {
  useInfiniteQuery: (params: ToursGetAllParams, branchId: string) => {
    const queryResult = useInfiniteQuery(
      [controllers.TOUR, "all", { ...params }, branchId],
      async ({ pageParam = 0 }) => {
        const data = await API.toursGetAll(params, branchId);
        return {
          data,
          pageParam,
        };
      },
      {
        getNextPageParam,
        getPreviousPageParam,
        refetchOnMount: "always",
      }
    );
    return queryResult;
  },
  useDetailsQuery: (id: string) => {
    const queryResult = useQuery(
      [controllers.TOUR, "details", id],
      () => API.getDetails(id),
      {
        enabled: !!id,
      }
    );
    return queryResult;
  },
  useCustomersListQuery: (id: string) => {
    const queryResult = useQuery([controllers.TOUR, "all"], () =>
      API.getCustomersList(id)
    );
    return queryResult;
  },
  useCity: () =>
    useQuery({ queryKey: ["getAllCities"], queryFn: API.getAllCities }),
  useSelectBranchQuery: () =>
    useQuery(
      [controllers.BRANCH, "select"],
      () => bussesAPI.getBranchSelect(),
      {
        refetchOnMount: "always",
        staleTime: Infinity,
      }
    ),
  useSelectBussesQuery: (branchId: string) =>
    useQuery(
      [controllers.BUS, "select", branchId],
      () => API.getBussesSelect(branchId),
      {
        refetchOnMount: "always",
        staleTime: Infinity,
      }
    ),
  useAddTourMutation: () => useMutation(API.tourAction),
  useRemoveMutation: () => useMutation(API.remove),
  // ======= RESERVATIONS QUERIES
  useCustomers: (params: TourGetCustomersParams) =>
    useInfiniteQuery(
      [controllers.TOUR, "reservations", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await API.getCustomers({
          ...params,
          pageNumber: params.pageNumber ?? pageParam,
        });
        return {
          data,
          pageParam,
        };
      },
      {
        getNextPageParam,
        getPreviousPageParam,
        refetchOnMount: "always",
      }
    ),
  useCustomerDetails: () => {},
  useDetailsForCustomerQuery: (id: string) =>
    useQuery(
      [controllers.TOUR, "detailsForCustomer", id],
      () => API.getForCustomer({ tourId: id }),
      {
        enabled: !!id,
      }
    ),
  useUnBook: () => useMutation(API.unbook),
  useRefund: () => useMutation(API.refund),
  useDownload: () => useMutation(API.getDownload),
  useCustomerAction: () => useMutation(API.customerAction),
  useCustomerListAction: () => useMutation(API.customerListAction),
  useBookedChairs: (tourId: string) =>
    useQuery({
      queryKey: [controllers.TOUR, "bookedChairs", tourId],
      queryFn: () => API.getBusBookedChairs(tourId),
    }),
  useEditTourTimeMutation: () => useMutation(API.editTourTime),
  useBusNameMutation: () => useMutation(API.editBusName)
};
