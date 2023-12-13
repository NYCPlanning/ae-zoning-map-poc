import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type { GetAllZoningDistrictClassesQueryResponse } from "../types/GetAllZoningDistrictClasses";

export const getAllZoningDistrictClassesQueryKey = () =>
  [{ url: `/zoning-district-classes` }] as const;
export function getAllZoningDistrictClassesQueryOptions<
  TData = GetAllZoningDistrictClassesQueryResponse,
  TError = unknown,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getAllZoningDistrictClassesQueryKey();

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

export function useGetAllZoningDistrictClasses<
  TData = GetAllZoningDistrictClassesQueryResponse,
  TError = unknown,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getAllZoningDistrictClassesQueryKey();

  const query = useQuery<TData, TError>({
    ...getAllZoningDistrictClassesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
