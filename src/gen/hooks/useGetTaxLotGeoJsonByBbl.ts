import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetTaxLotGeoJsonByBblQueryResponse,
  GetTaxLotGeoJsonByBblPathParams,
} from "../types/GetTaxLotGeoJsonByBbl";

export const getTaxLotGeoJsonByBblQueryKey = (
  bbl: GetTaxLotGeoJsonByBblPathParams["bbl"],
) => [{ url: `/tax-lots/${bbl}/geojson`, params: { bbl: bbl } }] as const;
export function getTaxLotGeoJsonByBblQueryOptions<
  TData = GetTaxLotGeoJsonByBblQueryResponse,
  TError = unknown,
>(
  bbl: GetTaxLotGeoJsonByBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getTaxLotGeoJsonByBblQueryKey(bbl);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/tax-lots/${bbl}/geojson`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary GeoJSON for a specific tax lot
 * @link /tax-lots/:bbl/geojson
 */

export function useGetTaxLotGeoJsonByBbl<
  TData = GetTaxLotGeoJsonByBblQueryResponse,
  TError = unknown,
>(
  bbl: GetTaxLotGeoJsonByBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getTaxLotGeoJsonByBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...getTaxLotGeoJsonByBblQueryOptions<TData, TError>(bbl, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
