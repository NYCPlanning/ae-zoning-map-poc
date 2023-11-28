import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type { GetZoningDistrictClassesQueryResponse } from "../types/GetZoningDistrictClasses";

export const getZoningDistrictClassesQueryKey = () =>
  [{ url: `/zoning-district-classes` }] as const;
export function getZoningDistrictClassesQueryOptions<
  TData = GetZoningDistrictClassesQueryResponse,
  TError = unknown,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictClassesQueryKey();

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
 * @summary List ZoningDistrictClasses
 * @link /zoning-district-classes
 */

export function useGetZoningDistrictClasses<
  TData = GetZoningDistrictClassesQueryResponse,
  TError = unknown,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getZoningDistrictClassesQueryKey();

  const query = useQuery<TData, TError>({
    ...getZoningDistrictClassesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
