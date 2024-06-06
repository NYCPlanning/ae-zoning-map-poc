import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams,
  FindCapitalProjectsByBoroughIdCommunityDistrictId400,
  FindCapitalProjectsByBoroughIdCommunityDistrictId404,
  FindCapitalProjectsByBoroughIdCommunityDistrictId500,
} from "../types/FindCapitalProjectsByBoroughIdCommunityDistrictId";

export const findCapitalProjectsByBoroughIdCommunityDistrictIdQueryKey = (
  boroughId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
) =>
  [
    {
      url: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/capital-projects`,
      params: {
        boroughId: boroughId,
        communityDistrictId: communityDistrictId,
      },
    },
  ] as const;
export function findCapitalProjectsByBoroughIdCommunityDistrictIdQueryOptions<
  TData = FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  TError =
    | FindCapitalProjectsByBoroughIdCommunityDistrictId400
    | FindCapitalProjectsByBoroughIdCommunityDistrictId404
    | FindCapitalProjectsByBoroughIdCommunityDistrictId500,
>(
  boroughId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findCapitalProjectsByBoroughIdCommunityDistrictIdQueryKey(
    boroughId,
    communityDistrictId,
  );

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/capital-projects`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary 🚧 Find paginated capital projects within a specified community district
 * @link /boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects
 */

export function useFindCapitalProjectsByBoroughIdCommunityDistrictId<
  TData = FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  TError =
    | FindCapitalProjectsByBoroughIdCommunityDistrictId400
    | FindCapitalProjectsByBoroughIdCommunityDistrictId404
    | FindCapitalProjectsByBoroughIdCommunityDistrictId500,
>(
  boroughId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    findCapitalProjectsByBoroughIdCommunityDistrictIdQueryKey(
      boroughId,
      communityDistrictId,
    );

  const query = useQuery<TData, TError>({
    ...findCapitalProjectsByBoroughIdCommunityDistrictIdQueryOptions<
      TData,
      TError
    >(boroughId, communityDistrictId, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
