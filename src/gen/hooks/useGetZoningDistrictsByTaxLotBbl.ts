import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetZoningDistrictsByTaxLotBblQueryResponse,
  GetZoningDistrictsByTaxLotBblPathParams,
  GetZoningDistrictsByTaxLotBbl400,
  GetZoningDistrictsByTaxLotBbl404,
  GetZoningDistrictsByTaxLotBbl500,
} from "../types/GetZoningDistrictsByTaxLotBbl";

export const getZoningDistrictsByTaxLotBblQueryKey = (
  bbl: GetZoningDistrictsByTaxLotBblPathParams["bbl"],
) =>
  [{ url: `/tax-lots/${bbl}/zoning-districts`, params: { bbl: bbl } }] as const;
export function getZoningDistrictsByTaxLotBblQueryOptions<
  TData = GetZoningDistrictsByTaxLotBblQueryResponse,
  TError =
    | GetZoningDistrictsByTaxLotBbl400
    | GetZoningDistrictsByTaxLotBbl404
    | GetZoningDistrictsByTaxLotBbl500,
>(
  bbl: GetZoningDistrictsByTaxLotBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictsByTaxLotBblQueryKey(bbl);

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

export function useGetZoningDistrictsByTaxLotBbl<
  TData = GetZoningDistrictsByTaxLotBblQueryResponse,
  TError =
    | GetZoningDistrictsByTaxLotBbl400
    | GetZoningDistrictsByTaxLotBbl404
    | GetZoningDistrictsByTaxLotBbl500,
>(
  bbl: GetZoningDistrictsByTaxLotBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getZoningDistrictsByTaxLotBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...getZoningDistrictsByTaxLotBblQueryOptions<TData, TError>(
      bbl,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
