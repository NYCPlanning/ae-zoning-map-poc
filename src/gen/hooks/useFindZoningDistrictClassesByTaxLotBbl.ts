import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindZoningDistrictClassesByTaxLotBblQueryResponse,
  FindZoningDistrictClassesByTaxLotBblPathParams,
  FindZoningDistrictClassesByTaxLotBbl400,
  FindZoningDistrictClassesByTaxLotBbl404,
  FindZoningDistrictClassesByTaxLotBbl500,
} from "../types/FindZoningDistrictClassesByTaxLotBbl";

export const findZoningDistrictClassesByTaxLotBblQueryKey = (
  bbl: FindZoningDistrictClassesByTaxLotBblPathParams["bbl"],
) =>
  [
    { url: `/tax-lots/${bbl}/zoning-districts/classes`, params: { bbl: bbl } },
  ] as const;
export function findZoningDistrictClassesByTaxLotBblQueryOptions<
  TData = FindZoningDistrictClassesByTaxLotBblQueryResponse,
  TError =
    | FindZoningDistrictClassesByTaxLotBbl400
    | FindZoningDistrictClassesByTaxLotBbl404
    | FindZoningDistrictClassesByTaxLotBbl500,
>(
  bbl: FindZoningDistrictClassesByTaxLotBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findZoningDistrictClassesByTaxLotBblQueryKey(bbl);

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

export function useFindZoningDistrictClassesByTaxLotBbl<
  TData = FindZoningDistrictClassesByTaxLotBblQueryResponse,
  TError =
    | FindZoningDistrictClassesByTaxLotBbl400
    | FindZoningDistrictClassesByTaxLotBbl404
    | FindZoningDistrictClassesByTaxLotBbl500,
>(
  bbl: FindZoningDistrictClassesByTaxLotBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? findZoningDistrictClassesByTaxLotBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...findZoningDistrictClassesByTaxLotBblQueryOptions<TData, TError>(
      bbl,
      clientOptions,
    ),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
