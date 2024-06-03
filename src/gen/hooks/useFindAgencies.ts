import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindAgenciesQueryResponse,
  FindAgencies400,
  FindAgencies500,
} from "../types/FindAgencies";

export const findAgenciesQueryKey = () => [{ url: `/agencies` }] as const;
export function findAgenciesQueryOptions<
  TData = FindAgenciesQueryResponse,
  TError = FindAgencies400 | FindAgencies500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findAgenciesQueryKey();

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/agencies`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary Find agencies
 * @link /agencies
 */

export function useFindAgencies<
  TData = FindAgenciesQueryResponse,
  TError = FindAgencies400 | FindAgencies500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? findAgenciesQueryKey();

  const query = useQuery<TData, TError>({
    ...findAgenciesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
