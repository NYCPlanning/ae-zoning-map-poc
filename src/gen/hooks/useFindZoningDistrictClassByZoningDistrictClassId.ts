import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindZoningDistrictClassByZoningDistrictClassIdQueryResponse,
  FindZoningDistrictClassByZoningDistrictClassIdPathParams,
  FindZoningDistrictClassByZoningDistrictClassId400,
  FindZoningDistrictClassByZoningDistrictClassId404,
  FindZoningDistrictClassByZoningDistrictClassId500,
} from "../types/FindZoningDistrictClassByZoningDistrictClassId";

export const findZoningDistrictClassByZoningDistrictClassIdQueryKey = (
  id: FindZoningDistrictClassByZoningDistrictClassIdPathParams["id"],
) => [{ url: `/zoning-district-classes/${id}`, params: { id: id } }] as const;
export function findZoningDistrictClassByZoningDistrictClassIdQueryOptions<
  TData = FindZoningDistrictClassByZoningDistrictClassIdQueryResponse,
  TError =
    | FindZoningDistrictClassByZoningDistrictClassId400
    | FindZoningDistrictClassByZoningDistrictClassId404
    | FindZoningDistrictClassByZoningDistrictClassId500,
>(
  id: FindZoningDistrictClassByZoningDistrictClassIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findZoningDistrictClassByZoningDistrictClassIdQueryKey(id);

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

export function useFindZoningDistrictClassByZoningDistrictClassId<
  TData = FindZoningDistrictClassByZoningDistrictClassIdQueryResponse,
  TError =
    | FindZoningDistrictClassByZoningDistrictClassId400
    | FindZoningDistrictClassByZoningDistrictClassId404
    | FindZoningDistrictClassByZoningDistrictClassId500,
>(
  id: FindZoningDistrictClassByZoningDistrictClassIdPathParams["id"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    findZoningDistrictClassByZoningDistrictClassIdQueryKey(id);

  const query = useQuery<TData, TError>({
    ...findZoningDistrictClassByZoningDistrictClassIdQueryOptions<
      TData,
      TError
    >(id, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
