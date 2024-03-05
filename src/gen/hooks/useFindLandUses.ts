import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindLandUsesQueryResponse, FindLandUses400, FindLandUses500 } from "../types/FindLandUses";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindLandUsesClient = typeof client<FindLandUsesQueryResponse, FindLandUses400 | FindLandUses500, never>;
type FindLandUses = {
    data: FindLandUsesQueryResponse;
    error: FindLandUses400 | FindLandUses500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: FindLandUsesQueryResponse;
    client: {
        parameters: Partial<Parameters<FindLandUsesClient>[0]>;
        return: Awaited<ReturnType<FindLandUsesClient>>;
    };
};
export const findLandUsesQueryKey = () => [{ url: "/land-uses" }] as const;
export type FindLandUsesQueryKey = ReturnType<typeof findLandUsesQueryKey>;
export function findLandUsesQueryOptions<TData = FindLandUses["response"], TQueryData = FindLandUses["response"]>(options: FindLandUses["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindLandUses["response"], FindLandUses["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findLandUsesQueryKey();
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindLandUses["data"], FindLandUses["error"]>({
                method: "get",
                url: `/land-uses`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary List land uses
     * @link /land-uses */
export function useFindLandUses<TData = FindLandUses["response"], TQueryData = FindLandUses["response"], TQueryKey extends QueryKey = FindLandUsesQueryKey>(options: {
    query?: Partial<UseBaseQueryOptions<FindLandUses["response"], FindLandUses["error"], TData, TQueryData, TQueryKey>>;
    client?: FindLandUses["client"]["parameters"];
} = {}): UseQueryResult<TData, FindLandUses["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findLandUsesQueryKey();
    const query = useQuery<FindLandUses["data"], FindLandUses["error"], TData, any>({
        ...findLandUsesQueryOptions<TData, TQueryData>(clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindLandUses["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}