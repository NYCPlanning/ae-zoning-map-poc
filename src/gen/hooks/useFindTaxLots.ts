import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindTaxLotsQueryResponse,
  FindTaxLotsQueryParams,
  FindTaxLots400,
  FindTaxLots500,
} from "../types/FindTaxLots";

export const findTaxLotsQueryKey = (params?: FindTaxLotsQueryParams) =>
  [{ url: `/tax-lots` }, ...(params ? [params] : [])] as const;
export function findTaxLotsQueryOptions<
  TData = FindTaxLotsQueryResponse,
  TError = FindTaxLots400 | FindTaxLots500,
>(
  params?: FindTaxLotsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findTaxLotsQueryKey(params);
  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/tax-lots`,
        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Non-spatial details for tax lots
 * @link /tax-lots
 */

export function useFindTaxLots<
  TData = FindTaxLotsQueryResponse,
  TError = FindTaxLots400 | FindTaxLots500,
>(
  params?: FindTaxLotsQueryParams,
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? findTaxLotsQueryKey(params);

  const query = useQuery<TData, TError>({
    ...findTaxLotsQueryOptions<TData, TError>(params, clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
