import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetZoningDistrictByIdQueryResponse,
  GetZoningDistrictByIdPathParams,
} from "../types/GetZoningDistrictById";

export const getZoningDistrictByIdQueryKey = (
  id: GetZoningDistrictByIdPathParams["id"],
) => [{ url: `/zoning-districts/${id}`, params: { id: id } }] as const;
export function getZoningDistrictByIdQueryOptions<
  TData = GetZoningDistrictByIdQueryResponse,
  TError = unknown,
>(
  id: GetZoningDistrictByIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictByIdQueryKey(id);

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

export function useGetZoningDistrictById<
  TData = GetZoningDistrictByIdQueryResponse,
  TError = unknown,
>(
  id: GetZoningDistrictByIdPathParams["id"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getZoningDistrictByIdQueryKey(id);

  const query = useQuery<TData, TError>({
    ...getZoningDistrictByIdQueryOptions<TData, TError>(id, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
