import type {
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
  QueryOptions,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import client from "../../client.ts";
import type {
  GetBoroughsQueryResponse,
  GetBoroughs400,
  GetBoroughs500,
} from "../types/GetBoroughs";

export const getBoroughsQueryKey = () => [{ url: `/boroughs` }] as const;
export function getBoroughsQueryOptions<
  TData = GetBoroughsQueryResponse,
  TError = GetBoroughs400 | GetBoroughs500,
>(
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = getBoroughsQueryKey();

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

export function useGetBoroughs<
  TData = GetBoroughsQueryResponse,
  TError = GetBoroughs400 | GetBoroughs500,
>(
  options: {
    query?: UseQueryOptions<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getBoroughsQueryKey();

  const query = useQuery<TData, TError>({
    ...getBoroughsQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey as QueryKey;

  return query;
}
