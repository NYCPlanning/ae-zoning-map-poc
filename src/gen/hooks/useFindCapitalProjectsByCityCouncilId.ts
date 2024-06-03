import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindCapitalProjectsByCityCouncilIdQueryResponse,
  FindCapitalProjectsByCityCouncilIdPathParams,
  FindCapitalProjectsByCityCouncilId400,
  FindCapitalProjectsByCityCouncilId404,
  FindCapitalProjectsByCityCouncilId500,
} from "../types/FindCapitalProjectsByCityCouncilId";

export const findCapitalProjectsByCityCouncilIdQueryKey = (
  cityCouncilDistrictId: FindCapitalProjectsByCityCouncilIdPathParams["cityCouncilDistrictId"],
) =>
  [
    {
      url: `/city-council-districts/${cityCouncilDistrictId}/capital-projects`,
      params: { cityCouncilDistrictId: cityCouncilDistrictId },
    },
  ] as const;
export function findCapitalProjectsByCityCouncilIdQueryOptions<
  TData = FindCapitalProjectsByCityCouncilIdQueryResponse,
  TError =
    | FindCapitalProjectsByCityCouncilId400
    | FindCapitalProjectsByCityCouncilId404
    | FindCapitalProjectsByCityCouncilId500,
>(
  cityCouncilDistrictId: FindCapitalProjectsByCityCouncilIdPathParams["cityCouncilDistrictId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findCapitalProjectsByCityCouncilIdQueryKey(
    cityCouncilDistrictId,
  );

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/city-council-districts/${cityCouncilDistrictId}/capital-projects`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary 🚧 Find paginated capital projects within a specific city council district.
 * @link /city-council-districts/:cityCouncilDistrictId/capital-projects
 */

export function useFindCapitalProjectsByCityCouncilId<
  TData = FindCapitalProjectsByCityCouncilIdQueryResponse,
  TError =
    | FindCapitalProjectsByCityCouncilId400
    | FindCapitalProjectsByCityCouncilId404
    | FindCapitalProjectsByCityCouncilId500,
>(
  cityCouncilDistrictId: FindCapitalProjectsByCityCouncilIdPathParams["cityCouncilDistrictId"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    findCapitalProjectsByCityCouncilIdQueryKey(cityCouncilDistrictId);

  const query = useQuery<TData, TError>({
    ...findCapitalProjectsByCityCouncilIdQueryOptions<TData, TError>(
      cityCouncilDistrictId,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
