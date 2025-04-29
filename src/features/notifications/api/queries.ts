import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "../../../constants/controllers";
import {
  getNextPageParam,
  getPreviousPageParam,
} from "../../../utils/apiHelpers";
import { NotifyApi } from "./apis";
import { NotificationGetALlParams } from "./types";

const NotifyQueries = {
  useInfiniteQuery: (params: NotificationGetALlParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.NOTIFICATION, "all", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await NotifyApi.getAll(params);
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
  useSetAsRead: () =>
    useMutation({
      mutationFn: NotifyApi.readNotification,
    }),
    useNotificationCount: () =>
      useQuery([controllers.NOTIFICATION, "count"], NotifyApi.getNotificationNumber),
  //   useInfinite: (params: NotificationGetALlParams) =>
  //     useInfiniteQuery(keys.getAll(params)),
  //   getAll: (params: NotificationGetALlParams) => ({
  //     queryKey: [params],
  //     async queryFn(context) {
  //       const pageParam = context?.pageParam ?? 0;
  //       params.pageNumber = pageParam;
  //       const data = await API.getAll(params);
  //       return {
  //         data,
  //         pageParam,
  //       };
  //     },
  //   }),
};
export default NotifyQueries;
