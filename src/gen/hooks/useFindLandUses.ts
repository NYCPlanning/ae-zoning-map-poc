import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  FindLandUsesQueryResponse,
  FindLandUses400,
  FindLandUses500,
} from "../types/FindLandUses";

export const findLandUsesQueryKey = () => [{ url: `/land-uses` }] as const;
export function findLandUsesQueryOptions<
  TData = FindLandUsesQueryResponse,
  TError = FindLandUses400 | FindLandUses500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findLandUsesQueryKey();

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: "get",
        url: `/land-uses`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @summary List land uses
 * @link /land-uses
 */

export function useFindLandUses<
  TData = FindLandUsesQueryResponse,
  TError = FindLandUses400 | FindLandUses500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? findLandUsesQueryKey();

  const query = useQuery<TData, TError>({
    ...findLandUsesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
