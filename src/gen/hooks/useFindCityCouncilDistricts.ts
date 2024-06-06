import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindCityCouncilDistrictsQueryResponse,
  FindCityCouncilDistricts400,
  FindCityCouncilDistricts500,
} from "../types/FindCityCouncilDistricts";

export const findCityCouncilDistrictsQueryKey = () =>
  [{ url: `/city-council-districts` }] as const;
export function findCityCouncilDistrictsQueryOptions<
  TData = FindCityCouncilDistrictsQueryResponse,
  TError = FindCityCouncilDistricts400 | FindCityCouncilDistricts500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findCityCouncilDistrictsQueryKey();

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/city-council-districts`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary 🚧 Find city council districts
 * @link /city-council-districts
 */

export function useFindCityCouncilDistricts<
  TData = FindCityCouncilDistrictsQueryResponse,
  TError = FindCityCouncilDistricts400 | FindCityCouncilDistricts500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? findCityCouncilDistrictsQueryKey();

  const query = useQuery<TData, TError>({
    ...findCityCouncilDistrictsQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
