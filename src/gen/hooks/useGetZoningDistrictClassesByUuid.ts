import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetZoningDistrictClassesByUuidQueryResponse,
  GetZoningDistrictClassesByUuidPathParams,
  GetZoningDistrictClassesByUuid400,
  GetZoningDistrictClassesByUuid404,
  GetZoningDistrictClassesByUuid500,
} from "../types/GetZoningDistrictClassesByUuid";

export const getZoningDistrictClassesByUuidQueryKey = (
  uuid: GetZoningDistrictClassesByUuidPathParams["uuid"],
) =>
  [
    { url: `/zoning-districts/${uuid}/classes`, params: { uuid: uuid } },
  ] as const;
export function getZoningDistrictClassesByUuidQueryOptions<
  TData = GetZoningDistrictClassesByUuidQueryResponse,
  TError =
    | GetZoningDistrictClassesByUuid400
    | GetZoningDistrictClassesByUuid404
    | GetZoningDistrictClassesByUuid500,
>(
  uuid: GetZoningDistrictClassesByUuidPathParams["uuid"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictClassesByUuidQueryKey(uuid);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/zoning-districts/${uuid}/classes`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Class schemas for the specified zoning district
 * @link /zoning-districts/:uuid/classes
 */

export function useGetZoningDistrictClassesByUuid<
  TData = GetZoningDistrictClassesByUuidQueryResponse,
  TError =
    | GetZoningDistrictClassesByUuid400
    | GetZoningDistrictClassesByUuid404
    | GetZoningDistrictClassesByUuid500,
>(
  uuid: GetZoningDistrictClassesByUuidPathParams["uuid"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getZoningDistrictClassesByUuidQueryKey(uuid);

  const query = useQuery<TData, TError>({
    ...getZoningDistrictClassesByUuidQueryOptions<TData, TError>(
      uuid,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
