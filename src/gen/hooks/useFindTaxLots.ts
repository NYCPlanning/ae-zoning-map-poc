import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindTaxLotsQueryResponse, FindTaxLotsQueryParams, FindTaxLots400, FindTaxLots500 } from "../types/FindTaxLots";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindTaxLotsClient = typeof client<FindTaxLotsQueryResponse, FindTaxLots400 | FindTaxLots500, never>;
type FindTaxLots = {
    data: FindTaxLotsQueryResponse;
    error: FindTaxLots400 | FindTaxLots500;
    request: never;
    pathParams: never;
    queryParams: FindTaxLotsQueryParams;
    headerParams: never;
    response: FindTaxLotsQueryResponse;
    client: {
        parameters: Partial<Parameters<FindTaxLotsClient>[0]>;
        return: Awaited<ReturnType<FindTaxLotsClient>>;
    };
};
export const findTaxLotsQueryKey = (params?: FindTaxLots["queryParams"]) => [{ url: "/tax-lots" }, ...(params ? [params] : [])] as const;
export type FindTaxLotsQueryKey = ReturnType<typeof findTaxLotsQueryKey>;
export function findTaxLotsQueryOptions<TData = FindTaxLots["response"], TQueryData = FindTaxLots["response"]>(params?: FindTaxLots["queryParams"], options: FindTaxLots["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindTaxLots["response"], FindTaxLots["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findTaxLotsQueryKey(params);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindTaxLots["data"], FindTaxLots["error"]>({
                method: "get",
                url: `/tax-lots`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Non-spatial details for tax lots
     * @link /tax-lots */
export function useFindTaxLots<TData = FindTaxLots["response"], TQueryData = FindTaxLots["response"], TQueryKey extends QueryKey = FindTaxLotsQueryKey>(params?: FindTaxLots["queryParams"], options: {
    query?: Partial<UseBaseQueryOptions<FindTaxLots["response"], FindTaxLots["error"], TData, TQueryData, TQueryKey>>;
    client?: FindTaxLots["client"]["parameters"];
} = {}): UseQueryResult<TData, FindTaxLots["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findTaxLotsQueryKey(params);
    const query = useQuery<FindTaxLots["data"], FindTaxLots["error"], TData, any>({
        ...findTaxLotsQueryOptions<TData, TQueryData>(params, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindTaxLots["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}