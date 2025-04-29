import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import { EmployeesGetAllParams } from "./types";
import employeesAPI from "./apis";

const employeesQuery = {
  useInfiniteQuery: (params: EmployeesGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [
        controllers.OwnerStaff,
        "all",
        params.query,
        params.pageNumber,
        params.branchId,
      ],
      async ({ pageParam = 0 }) => {
        const data = await employeesAPI.getAll(params);
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
      [controllers.OwnerStaff, "details", id],
      () => employeesAPI.get(id),
      {
        enabled: !!id,
      }
    );
    return queryResult;
  },
  useSelectQuery: (id: string | null) => {
    const queryResult = useQuery([controllers.OwnerStaff, "select", id], () =>
      employeesAPI.getSelect(id)
    );
    return queryResult;
  },
  useAddEmployeeMutation: () => useMutation(employeesAPI.post),
  useRemoveMutation: () => useMutation(employeesAPI.remove),
};

export default employeesQuery;
