import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindZoningDistrictClassCategoryColorsQueryResponse,
  FindZoningDistrictClassCategoryColors400,
  FindZoningDistrictClassCategoryColors500,
} from "../types/FindZoningDistrictClassCategoryColors";

export const findZoningDistrictClassCategoryColorsQueryKey = () =>
  [{ url: `/zoning-district-classes/category-colors` }] as const;
export function findZoningDistrictClassCategoryColorsQueryOptions<
  TData = FindZoningDistrictClassCategoryColorsQueryResponse,
  TError =
    | FindZoningDistrictClassCategoryColors400
    | FindZoningDistrictClassCategoryColors500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findZoningDistrictClassCategoryColorsQueryKey();

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

export function useFindZoningDistrictClassCategoryColors<
  TData = FindZoningDistrictClassCategoryColorsQueryResponse,
  TError =
    | FindZoningDistrictClassCategoryColors400
    | FindZoningDistrictClassCategoryColors500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? findZoningDistrictClassCategoryColorsQueryKey();

  const query = useQuery<TData, TError>({
    ...findZoningDistrictClassCategoryColorsQueryOptions<TData, TError>(
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
