import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import controllers from "../../constants/controllers";
import { accountingAPI } from "./apis";
import {
  AccountingAnalyticsParams,
  AccountingBoxesDetailsParams,
  AccountingDetailsParams,
  AccountingParams,
  AccountingTourDetailsParams,
} from "@/API/accounting/types";
import { PaginationParams } from "@/types/api";

export const accountingQueries = {
  useInfiniteQuery: (params: AccountingParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "all", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await accountingAPI.getAll(params);
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
  useDetailsInfiniteQuery: (params: AccountingDetailsParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "details", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await accountingAPI.getDetails(params);
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
  useTourDetailsInfiniteQuery: (params: AccountingTourDetailsParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "tour details", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await accountingAPI.getTourDetails(params);
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
  useBoxesDetilsQuery: (params: AccountingBoxesDetailsParams) => {
    const queryResult = useQuery(
      [controllers.ACCOUNTING, "boxes", params.tourId],
      () => accountingAPI.getBoxesDetails(params)
    );
    return queryResult;
  },

  useGeneralBoxesQuery: (
    params: PaginationParams & { isReceived?: boolean }
  ) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "general-boxes", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await accountingAPI.getGeneralBoxes(params);
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

  useAnalyticsQuery: (params: AccountingAnalyticsParams) => {
    const queryResult = useQuery(
      [controllers.ACCOUNTING, "analytics", { ...params }],
      () => accountingAPI.getAnalytics(params)
    );
    return queryResult;
  },

  useCashedQuery: () => {
    const queryResult = useQuery([controllers.ACCOUNTING, "cashed"], () =>
      accountingAPI.getCashed()
    );
    return queryResult;
  },

  useRecievedQuery: () => {
    const queryResult = useQuery([controllers.ACCOUNTING, "recieved"], () =>
      accountingAPI.getRecieved()
    );
    return queryResult;
  },
  useDownloadOnwerStaff: ()=>useMutation(accountingAPI.getDownloadOnwerStaff),
  useDownloadOwnerStaffDetails: ()=> useMutation(accountingAPI.getDownloadownerStaffDetails),
  useDownloadAccountDetails: () => useMutation(accountingAPI.getDownloadAccountingDetails),
  useDownloadGeneralSandook: ()=> useMutation(accountingAPI.getDownloadSandookGeneral),
  useDownloadTourFinance: ()=> useMutation(accountingAPI.getDownloadTourFinance),
  action: () => useMutation(accountingAPI.action),
  cashedAction: () => useMutation(accountingAPI.cashedAction),
  recievedAction: () => useMutation(accountingAPI.recievedAction),
  recieveTorusAction: () => useMutation(accountingAPI.recieveToursAction),
  removeSandookTour: () => useMutation(accountingAPI.removeSandookTour),
  generalBoxesRecieve: () => useMutation(accountingAPI.generalBoxesRecieve),
  ownerRecievedAction: () => useMutation(accountingAPI.ownerRecievedAction),
  ownerFinishedAction: () => useMutation(accountingAPI.ownerFinishedAction),

};
