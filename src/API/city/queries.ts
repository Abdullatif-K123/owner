import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import cityAPI from "./apis";
import { CityGetAllParams } from "./types";
const cityQueries = {
  useInfiniteQuery: (params: CityGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.CITY, "all", params.pageNumber, params.query, params.countryId],
      async ({ pageParam = 0 }) => {
        const data = await cityAPI.getAll(params);
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
  useQuery: (id: string | null) => {
    const queryResult = useQuery([controllers.CITY, id], () => cityAPI.get(id ?? ""), {
      enabled: !!id,
    });
    return queryResult;
  },
  useSelectQuery: (countryId: string | null) => {
    const queryResult = useQuery(
      [controllers.CITY, "select", countryId],
      () => cityAPI.getAllNp(countryId),
      {
        select: (cities) => cities.map(({ id, cityName }) => ({ id, cityName })),
      }
    );
    return queryResult;
  },
};
export default cityQueries;
