import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindCommunityDistrictsByBoroughIdQueryResponse,
  FindCommunityDistrictsByBoroughIdPathParams,
  FindCommunityDistrictsByBoroughId400,
  FindCommunityDistrictsByBoroughId404,
  FindCommunityDistrictsByBoroughId500,
} from "../types/FindCommunityDistrictsByBoroughId";

export const findCommunityDistrictsByBoroughIdQueryKey = (
  boroughId: FindCommunityDistrictsByBoroughIdPathParams["boroughId"],
) =>
  [
    {
      url: `/boroughs/${boroughId}/community-districts`,
      params: { boroughId: boroughId },
    },
  ] as const;
export function findCommunityDistrictsByBoroughIdQueryOptions<
  TData = FindCommunityDistrictsByBoroughIdQueryResponse,
  TError =
    | FindCommunityDistrictsByBoroughId400
    | FindCommunityDistrictsByBoroughId404
    | FindCommunityDistrictsByBoroughId500,
>(
  boroughId: FindCommunityDistrictsByBoroughIdPathParams["boroughId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findCommunityDistrictsByBoroughIdQueryKey(boroughId);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/boroughs/${boroughId}/community-districts`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary 🚧 Find community districts within a borough
 * @link /boroughs/:boroughId/community-districts
 */

export function useFindCommunityDistrictsByBoroughId<
  TData = FindCommunityDistrictsByBoroughIdQueryResponse,
  TError =
    | FindCommunityDistrictsByBoroughId400
    | FindCommunityDistrictsByBoroughId404
    | FindCommunityDistrictsByBoroughId500,
>(
  boroughId: FindCommunityDistrictsByBoroughIdPathParams["boroughId"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    findCommunityDistrictsByBoroughIdQueryKey(boroughId);

  const query = useQuery<TData, TError>({
    ...findCommunityDistrictsByBoroughIdQueryOptions<TData, TError>(
      boroughId,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
