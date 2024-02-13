import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindZoningDistrictsByTaxLotBblQueryResponse,
  FindZoningDistrictsByTaxLotBblPathParams,
  FindZoningDistrictsByTaxLotBbl400,
  FindZoningDistrictsByTaxLotBbl404,
  FindZoningDistrictsByTaxLotBbl500,
} from "../types/FindZoningDistrictsByTaxLotBbl";

export const findZoningDistrictsByTaxLotBblQueryKey = (
  bbl: FindZoningDistrictsByTaxLotBblPathParams["bbl"],
) =>
  [{ url: `/tax-lots/${bbl}/zoning-districts`, params: { bbl: bbl } }] as const;
export function findZoningDistrictsByTaxLotBblQueryOptions<
  TData = FindZoningDistrictsByTaxLotBblQueryResponse,
  TError =
    | FindZoningDistrictsByTaxLotBbl400
    | FindZoningDistrictsByTaxLotBbl404
    | FindZoningDistrictsByTaxLotBbl500,
>(
  bbl: FindZoningDistrictsByTaxLotBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findZoningDistrictsByTaxLotBblQueryKey(bbl);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/tax-lots/${bbl}/zoning-districts`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Non-spatial details for zoning districts that spatially intersect a tax lot.
 * @link /tax-lots/:bbl/zoning-districts
 */

export function useFindZoningDistrictsByTaxLotBbl<
  TData = FindZoningDistrictsByTaxLotBblQueryResponse,
  TError =
    | FindZoningDistrictsByTaxLotBbl400
    | FindZoningDistrictsByTaxLotBbl404
    | FindZoningDistrictsByTaxLotBbl500,
>(
  bbl: FindZoningDistrictsByTaxLotBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? findZoningDistrictsByTaxLotBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...findZoningDistrictsByTaxLotBblQueryOptions<TData, TError>(
      bbl,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
