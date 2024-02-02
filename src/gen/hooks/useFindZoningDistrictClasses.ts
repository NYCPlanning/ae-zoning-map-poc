import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindZoningDistrictClassesQueryResponse,
  FindZoningDistrictClasses400,
  FindZoningDistrictClasses500,
} from "../types/FindZoningDistrictClasses";

export const findZoningDistrictClassesQueryKey = () =>
  [{ url: `/zoning-district-classes` }] as const;
export function findZoningDistrictClassesQueryOptions<
  TData = FindZoningDistrictClassesQueryResponse,
  TError = FindZoningDistrictClasses400 | FindZoningDistrictClasses500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findZoningDistrictClassesQueryKey();

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/zoning-district-classes`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Class schemas for all zoning districts
 * @link /zoning-district-classes
 */

export function useFindZoningDistrictClasses<
  TData = FindZoningDistrictClassesQueryResponse,
  TError = FindZoningDistrictClasses400 | FindZoningDistrictClasses500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? findZoningDistrictClassesQueryKey();

  const query = useQuery<TData, TError>({
    ...findZoningDistrictClassesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
