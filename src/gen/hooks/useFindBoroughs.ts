import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindBoroughsQueryResponse, FindBoroughs400, FindBoroughs500 } from "../types/FindBoroughs";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindBoroughsClient = typeof client<FindBoroughsQueryResponse, FindBoroughs400 | FindBoroughs500, never>;
type FindBoroughs = {
    data: FindBoroughsQueryResponse;
    error: FindBoroughs400 | FindBoroughs500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: FindBoroughsQueryResponse;
    client: {
        parameters: Partial<Parameters<FindBoroughsClient>[0]>;
        return: Awaited<ReturnType<FindBoroughsClient>>;
    };
};
export const findBoroughsQueryKey = () => [{ url: "/boroughs" }] as const;
export type FindBoroughsQueryKey = ReturnType<typeof findBoroughsQueryKey>;
export function findBoroughsQueryOptions<TData = FindBoroughs["response"], TQueryData = FindBoroughs["response"]>(options: FindBoroughs["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindBoroughs["response"], FindBoroughs["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findBoroughsQueryKey();
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindBoroughs["data"], FindBoroughs["error"]>({
                method: "get",
                url: `/boroughs`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary List boroughs
     * @link /boroughs */
export function useFindBoroughs<TData = FindBoroughs["response"], TQueryData = FindBoroughs["response"], TQueryKey extends QueryKey = FindBoroughsQueryKey>(options: {
    query?: Partial<UseBaseQueryOptions<FindBoroughs["response"], FindBoroughs["error"], TData, TQueryData, TQueryKey>>;
    client?: FindBoroughs["client"]["parameters"];
} = {}): UseQueryResult<TData, FindBoroughs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findBoroughsQueryKey();
    const query = useQuery<FindBoroughs["data"], FindBoroughs["error"], TData, any>({
        ...findBoroughsQueryOptions<TData, TQueryData>(clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindBoroughs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}