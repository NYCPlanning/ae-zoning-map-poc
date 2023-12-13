import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetZoningDistrictClassesByIdQueryResponse,
  GetZoningDistrictClassesByIdPathParams,
} from "../types/GetZoningDistrictClassesById";

export const getZoningDistrictClassesByIdQueryKey = (
  id: GetZoningDistrictClassesByIdPathParams["id"],
) => [{ url: `/zoning-district-classes/${id}`, params: { id: id } }] as const;
export function getZoningDistrictClassesByIdQueryOptions<
  TData = GetZoningDistrictClassesByIdQueryResponse,
  TError = unknown,
>(
  id: GetZoningDistrictClassesByIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictClassesByIdQueryKey(id);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/zoning-district-classes/${id}`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Class schema for the specified class
 * @link /zoning-district-classes/:id
 */

export function useGetZoningDistrictClassesById<
  TData = GetZoningDistrictClassesByIdQueryResponse,
  TError = unknown,
>(
  id: GetZoningDistrictClassesByIdPathParams["id"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getZoningDistrictClassesByIdQueryKey(id);

  const query = useQuery<TData, TError>({
    ...getZoningDistrictClassesByIdQueryOptions<TData, TError>(
      id,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
