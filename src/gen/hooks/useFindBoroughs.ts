import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindBoroughsQueryResponse,
  FindBoroughs400,
  FindBoroughs500,
} from "../types/FindBoroughs";

export const findBoroughsQueryKey = () => [{ url: `/boroughs` }] as const;
export function findBoroughsQueryOptions<
  TData = FindBoroughsQueryResponse,
  TError = FindBoroughs400 | FindBoroughs500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findBoroughsQueryKey();

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/boroughs`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary List boroughs
 * @link /boroughs
 */

export function useFindBoroughs<
  TData = FindBoroughsQueryResponse,
  TError = FindBoroughs400 | FindBoroughs500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? findBoroughsQueryKey();

  const query = useQuery<TData, TError>({
    ...findBoroughsQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
