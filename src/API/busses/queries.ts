import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { GetAllBussesParams, ModelGetAllParams } from "./types";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import bussesAPI from "./apis";

const bussesQuery = {
  useInfiniteQuery: (params: ModelGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [
        controllers.MODEL,
        "all",
        params.query,
        params.pageNumber,
        params.enablePagination,
      ],
      async ({ pageParam = 0 }) => {
        const data = await bussesAPI.getAllModels(params);
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
  useBussesInfiniteQuery: (params: GetAllBussesParams) => {
    const queryResult = useInfiniteQuery(
      [
        controllers.BUS,
        "all",
        params.params?.query,
        params.params?.pageNumber,
        params.body,
      ],
      async ({ pageParam = 0 }) => {
        const data = await bussesAPI.getAllBusses(params);
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
      [controllers.BUS, "details", id],
      () => bussesAPI.get(id),
      {
        enabled: !!id,
      }
    );
    return queryResult;
  },
  useSelectBranchQuery: () =>
    useQuery(
      [controllers.BRANCH, "select"],
      () => bussesAPI.getBranchSelect(),
      {
        refetchOnMount: "always",
        staleTime: Infinity,
      }
    ),
  useAddFileMutation: () => useMutation(bussesAPI.uploadImage),
  useAddBusMutation: () => useMutation(bussesAPI.busAction),
  useRemoveMutation: () => useMutation(bussesAPI.remove),
};

export default bussesQuery;
