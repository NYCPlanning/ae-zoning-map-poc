import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type { GetZoningDistrictClassCategoryColorsQueryResponse } from "../types/GetZoningDistrictClassCategoryColors";

export const getZoningDistrictClassCategoryColorsQueryKey = () =>
  [{ url: `/zoning-district-classes/category-colors` }] as const;
export function getZoningDistrictClassCategoryColorsQueryOptions<
  TData = GetZoningDistrictClassCategoryColorsQueryResponse,
  TError = unknown,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictClassCategoryColorsQueryKey();

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/zoning-district-classes/category-colors`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary List ZoningDistrictClassCategoryColors
 * @link /zoning-district-classes/category-colors
 */

export function useGetZoningDistrictClassCategoryColors<
  TData = GetZoningDistrictClassCategoryColorsQueryResponse,
  TError = unknown,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getZoningDistrictClassCategoryColorsQueryKey();

  const query = useQuery<TData, TError>({
    ...getZoningDistrictClassCategoryColorsQueryOptions<TData, TError>(
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
