import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import controllers from "../../constants/controllers";
import { companyAccountingAPI } from "./apis";
import {
  CompanyAccountingBody,
  CompanyAccountingDetailsParams,
  CompanyAccountingParams,
} from "@/API/company-accounting/types";

export const companyAccountingQueries = {
  useInfiniteQuery: (
    params: CompanyAccountingParams,
    body: CompanyAccountingBody
  ) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "company-all", { ...params, ...body }],
      async ({ pageParam = 0 }) => {
        const data = await companyAccountingAPI.getAll(params, body);
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
  useInfiniteQueryCash: (
    params: CompanyAccountingParams,
    body: CompanyAccountingBody
  ) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "company-all-cash", { ...params, ...body }],
      async ({ pageParam = 0 }) => {
        const data = await companyAccountingAPI.getAllCash(params, body);
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
  useDetailsInfiniteQuery: (params: CompanyAccountingDetailsParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "company-details", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await companyAccountingAPI.getDetails(params);
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
  action: () => useMutation(companyAccountingAPI.action),
};
