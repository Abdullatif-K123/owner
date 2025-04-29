import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { API } from './apis';
import controllers from '../../constants/controllers';
import { getNextPageParam, getPreviousPageParam } from '../../utils/apiHelpers';
import { VirtualGetAllParams } from './types';

export const virtualQueries = {
  useInfiniteQuery: (params: VirtualGetAllParams, branchId: string) => {
    const queryResult = useInfiniteQuery(
      [controllers.VIRTUAL_TOUR, 'all', { ...params }, branchId],
      async ({ pageParam = 0 }) => {
        const data = await API.GetAll(params, branchId);
        return {
          data,
          pageParam,
        };
      },
      {
        getNextPageParam,
        getPreviousPageParam,
        refetchOnMount: 'always',
      }
    );
    return queryResult;
  },
  useDetailsQuery: (id: string) => {
    const queryResult = useQuery([controllers.VIRTUAL_TOUR, 'details', id], () => API.getDetails(id), {
      enabled: !!id,
    });
    return queryResult;
  },
  useAction: () => useMutation(API.Action),
  useRemove: () => useMutation(API.remove),
};
