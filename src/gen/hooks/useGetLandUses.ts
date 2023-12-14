import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetLandUsesQueryResponse,
  GetLandUses400,
  GetLandUses500,
} from "../types/GetLandUses";

export const getLandUsesQueryKey = () => [{ url: `/land-uses` }] as const;
export function getLandUsesQueryOptions<
  TData = GetLandUsesQueryResponse,
  TError = GetLandUses400 | GetLandUses500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getLandUsesQueryKey();

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

export function useGetLandUses<
  TData = GetLandUsesQueryResponse,
  TError = GetLandUses400 | GetLandUses500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getLandUsesQueryKey();

  const query = useQuery<TData, TError>({
    ...getLandUsesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
