import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import { ManagersGetAllParams } from "@/API/managers/types";
import managersAPI from "@/API/managers/apis";

const managersQuery = {
  useInfiniteQuery: (params: ManagersGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [
        controllers.OwnerStaff,
        "all_managers",
        params.query,
        params.pageNumber,
        params.branchId,
      ],
      async ({ pageParam = 0 }) => {
        const data = await managersAPI.getAll(params);
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
      [controllers.OwnerStaff, "details_manager", id],
      () => managersAPI.get(id),
      {
        enabled: !!id,
      }
    );
    return queryResult;
  },
  useAddEmployeeMutation: () => useMutation(managersAPI.post),
  useRemoveMutation: () => useMutation(managersAPI.remove),
};

export default managersQuery;
