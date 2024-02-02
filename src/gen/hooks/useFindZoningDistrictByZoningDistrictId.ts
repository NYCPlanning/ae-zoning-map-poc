import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindZoningDistrictByZoningDistrictIdQueryResponse,
  FindZoningDistrictByZoningDistrictIdPathParams,
  FindZoningDistrictByZoningDistrictId400,
  FindZoningDistrictByZoningDistrictId404,
  FindZoningDistrictByZoningDistrictId500,
} from "../types/FindZoningDistrictByZoningDistrictId";

export const findZoningDistrictByZoningDistrictIdQueryKey = (
  id: FindZoningDistrictByZoningDistrictIdPathParams["id"],
) => [{ url: `/zoning-districts/${id}`, params: { id: id } }] as const;
export function findZoningDistrictByZoningDistrictIdQueryOptions<
  TData = FindZoningDistrictByZoningDistrictIdQueryResponse,
  TError =
    | FindZoningDistrictByZoningDistrictId400
    | FindZoningDistrictByZoningDistrictId404
    | FindZoningDistrictByZoningDistrictId500,
>(
  id: FindZoningDistrictByZoningDistrictIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findZoningDistrictByZoningDistrictIdQueryKey(id);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/zoning-districts/${id}`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Non-spatial details for a specific zoning district
 * @link /zoning-districts/:id
 */

export function useFindZoningDistrictByZoningDistrictId<
  TData = FindZoningDistrictByZoningDistrictIdQueryResponse,
  TError =
    | FindZoningDistrictByZoningDistrictId400
    | FindZoningDistrictByZoningDistrictId404
    | FindZoningDistrictByZoningDistrictId500,
>(
  id: FindZoningDistrictByZoningDistrictIdPathParams["id"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? findZoningDistrictByZoningDistrictIdQueryKey(id);

  const query = useQuery<TData, TError>({
    ...findZoningDistrictByZoningDistrictIdQueryOptions<TData, TError>(
      id,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
