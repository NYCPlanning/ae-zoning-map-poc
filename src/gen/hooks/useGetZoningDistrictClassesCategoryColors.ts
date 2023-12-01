import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type { GetZoningDistrictClassesCategoryColorsQueryResponse } from "../types/GetZoningDistrictClassesCategoryColors";

export const getZoningDistrictClassesCategoryColorsQueryKey = () =>
  [{ url: `/zoning-district-classes/category-colors` }] as const;
export function getZoningDistrictClassesCategoryColorsQueryOptions<
  TData = GetZoningDistrictClassesCategoryColorsQueryResponse,
  TError = unknown,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictClassesCategoryColorsQueryKey();

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
 * @summary List of color and class category
 * @link /zoning-district-classes/category-colors
 */

export function useGetZoningDistrictClassesCategoryColors<
  TData = GetZoningDistrictClassesCategoryColorsQueryResponse,
  TError = unknown,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getZoningDistrictClassesCategoryColorsQueryKey();

  const query = useQuery<TData, TError>({
    ...getZoningDistrictClassesCategoryColorsQueryOptions<TData, TError>(
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
