import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindTaxLotByBblQueryResponse,
  FindTaxLotByBblPathParams,
  FindTaxLotByBbl400,
  FindTaxLotByBbl404,
  FindTaxLotByBbl500,
} from "../types/FindTaxLotByBbl";

export const findTaxLotByBblQueryKey = (
  bbl: FindTaxLotByBblPathParams["bbl"],
) => [{ url: `/tax-lots/${bbl}`, params: { bbl: bbl } }] as const;
export function findTaxLotByBblQueryOptions<
  TData = FindTaxLotByBblQueryResponse,
  TError = FindTaxLotByBbl400 | FindTaxLotByBbl404 | FindTaxLotByBbl500,
>(
  bbl: FindTaxLotByBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findTaxLotByBblQueryKey(bbl);

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

export function useFindTaxLotByBbl<
  TData = FindTaxLotByBblQueryResponse,
  TError = FindTaxLotByBbl400 | FindTaxLotByBbl404 | FindTaxLotByBbl500,
>(
  bbl: FindTaxLotByBblPathParams["bbl"],
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? findTaxLotByBblQueryKey(bbl);

  const query = useQuery<TData, TError>({
    ...findTaxLotByBblQueryOptions<TData, TError>(bbl, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
