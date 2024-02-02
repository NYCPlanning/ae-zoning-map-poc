import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindZoningDistrictClassesByZoningDistrictIdQueryResponse,
  FindZoningDistrictClassesByZoningDistrictIdPathParams,
  FindZoningDistrictClassesByZoningDistrictId400,
  FindZoningDistrictClassesByZoningDistrictId404,
  FindZoningDistrictClassesByZoningDistrictId500,
} from "../types/FindZoningDistrictClassesByZoningDistrictId";

export const findZoningDistrictClassesByZoningDistrictIdQueryKey = (
  id: FindZoningDistrictClassesByZoningDistrictIdPathParams["id"],
) => [{ url: `/zoning-districts/${id}/classes`, params: { id: id } }] as const;
export function findZoningDistrictClassesByZoningDistrictIdQueryOptions<
  TData = FindZoningDistrictClassesByZoningDistrictIdQueryResponse,
  TError =
    | FindZoningDistrictClassesByZoningDistrictId400
    | FindZoningDistrictClassesByZoningDistrictId404
    | FindZoningDistrictClassesByZoningDistrictId500,
>(
  id: FindZoningDistrictClassesByZoningDistrictIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findZoningDistrictClassesByZoningDistrictIdQueryKey(id);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/zoning-districts/${id}/classes`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Class schemas for the specified zoning district
 * @link /zoning-districts/:id/classes
 */

export function useFindZoningDistrictClassesByZoningDistrictId<
  TData = FindZoningDistrictClassesByZoningDistrictIdQueryResponse,
  TError =
    | FindZoningDistrictClassesByZoningDistrictId400
    | FindZoningDistrictClassesByZoningDistrictId404
    | FindZoningDistrictClassesByZoningDistrictId500,
>(
  id: FindZoningDistrictClassesByZoningDistrictIdPathParams["id"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    findZoningDistrictClassesByZoningDistrictIdQueryKey(id);

  const query = useQuery<TData, TError>({
    ...findZoningDistrictClassesByZoningDistrictIdQueryOptions<TData, TError>(
      id,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
