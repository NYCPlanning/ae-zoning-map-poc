import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetZoningDistrictClassesByTaxLotBblQueryResponse,
  GetZoningDistrictClassesByTaxLotBblPathParams,
  GetZoningDistrictClassesByTaxLotBbl400,
  GetZoningDistrictClassesByTaxLotBbl404,
  GetZoningDistrictClassesByTaxLotBbl500,
} from "../types/GetZoningDistrictClassesByTaxLotBbl";

export const getZoningDistrictClassesByTaxLotBblQueryKey = (
  bbl: GetZoningDistrictClassesByTaxLotBblPathParams["bbl"],
) =>
  [
    { url: `/tax-lots/${bbl}/zoning-districts/classes`, params: { bbl: bbl } },
  ] as const;
export function getZoningDistrictClassesByTaxLotBblQueryOptions<
  TData = GetZoningDistrictClassesByTaxLotBblQueryResponse,
  TError =
    | GetZoningDistrictClassesByTaxLotBbl400
    | GetZoningDistrictClassesByTaxLotBbl404
    | GetZoningDistrictClassesByTaxLotBbl500,
>(
  bbl: GetZoningDistrictClassesByTaxLotBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getZoningDistrictClassesByTaxLotBblQueryKey(bbl);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/tax-lots/${bbl}/zoning-districts/classes`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Class schemas for all zoning districts that spatially intersect the tax lot
 * @link /tax-lots/:bbl/zoning-districts/classes
 */

export function useGetZoningDistrictClassesByTaxLotBbl<
  TData = GetZoningDistrictClassesByTaxLotBblQueryResponse,
  TError =
    | GetZoningDistrictClassesByTaxLotBbl400
    | GetZoningDistrictClassesByTaxLotBbl404
    | GetZoningDistrictClassesByTaxLotBbl500,
>(
  bbl: GetZoningDistrictClassesByTaxLotBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getZoningDistrictClassesByTaxLotBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...getZoningDistrictClassesByTaxLotBblQueryOptions<TData, TError>(
      bbl,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
