import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindTaxLotGeoJsonByBblQueryResponse,
  FindTaxLotGeoJsonByBblPathParams,
  FindTaxLotGeoJsonByBbl400,
  FindTaxLotGeoJsonByBbl404,
  FindTaxLotGeoJsonByBbl500,
} from "../types/FindTaxLotGeoJsonByBbl";

export const findTaxLotGeoJsonByBblQueryKey = (
  bbl: FindTaxLotGeoJsonByBblPathParams["bbl"],
) => [{ url: `/tax-lots/${bbl}/geojson`, params: { bbl: bbl } }] as const;
export function findTaxLotGeoJsonByBblQueryOptions<
  TData = FindTaxLotGeoJsonByBblQueryResponse,
  TError =
    | FindTaxLotGeoJsonByBbl400
    | FindTaxLotGeoJsonByBbl404
    | FindTaxLotGeoJsonByBbl500,
>(
  bbl: FindTaxLotGeoJsonByBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findTaxLotGeoJsonByBblQueryKey(bbl);

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

export function useFindTaxLotGeoJsonByBbl<
  TData = FindTaxLotGeoJsonByBblQueryResponse,
  TError =
    | FindTaxLotGeoJsonByBbl400
    | FindTaxLotGeoJsonByBbl404
    | FindTaxLotGeoJsonByBbl500,
>(
  bbl: FindTaxLotGeoJsonByBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? findTaxLotGeoJsonByBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...findTaxLotGeoJsonByBblQueryOptions<TData, TError>(bbl, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
