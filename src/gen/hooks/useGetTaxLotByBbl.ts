import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetTaxLotByBblQueryResponse,
  GetTaxLotByBblPathParams,
} from "../types/GetTaxLotByBbl";

export const getTaxLotByBblQueryKey = (bbl: GetTaxLotByBblPathParams["bbl"]) =>
  [{ url: `/tax-lots/${bbl}`, params: { bbl: bbl } }] as const;
export function getTaxLotByBblQueryOptions<
  TData = GetTaxLotByBblQueryResponse,
  TError = unknown,
>(
  bbl: GetTaxLotByBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getTaxLotByBblQueryKey(bbl);

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/tax-lots/${bbl}`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Non-spatial details for a specific tax lot
 * @link /tax-lots/:bbl
 */

export function useGetTaxLotByBbl<
  TData = GetTaxLotByBblQueryResponse,
  TError = unknown,
>(
  bbl: GetTaxLotByBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getTaxLotByBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...getTaxLotByBblQueryOptions<TData, TError>(bbl, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
