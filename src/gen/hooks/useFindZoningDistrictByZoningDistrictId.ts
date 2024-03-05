import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindZoningDistrictByZoningDistrictIdQueryResponse, FindZoningDistrictByZoningDistrictIdPathParams, FindZoningDistrictByZoningDistrictId400, FindZoningDistrictByZoningDistrictId404, FindZoningDistrictByZoningDistrictId500 } from "../types/FindZoningDistrictByZoningDistrictId";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindZoningDistrictByZoningDistrictIdClient = typeof client<FindZoningDistrictByZoningDistrictIdQueryResponse, FindZoningDistrictByZoningDistrictId400 | FindZoningDistrictByZoningDistrictId404 | FindZoningDistrictByZoningDistrictId500, never>;
type FindZoningDistrictByZoningDistrictId = {
    data: FindZoningDistrictByZoningDistrictIdQueryResponse;
    error: FindZoningDistrictByZoningDistrictId400 | FindZoningDistrictByZoningDistrictId404 | FindZoningDistrictByZoningDistrictId500;
    request: never;
    pathParams: FindZoningDistrictByZoningDistrictIdPathParams;
    queryParams: never;
    headerParams: never;
    response: FindZoningDistrictByZoningDistrictIdQueryResponse;
    client: {
        parameters: Partial<Parameters<FindZoningDistrictByZoningDistrictIdClient>[0]>;
        return: Awaited<ReturnType<FindZoningDistrictByZoningDistrictIdClient>>;
    };
};
export const findZoningDistrictByZoningDistrictIdQueryKey = (id: FindZoningDistrictByZoningDistrictIdPathParams["id"]) => [{ url: "/zoning-districts/:id", params: { id: id } }] as const;
export type FindZoningDistrictByZoningDistrictIdQueryKey = ReturnType<typeof findZoningDistrictByZoningDistrictIdQueryKey>;
export function findZoningDistrictByZoningDistrictIdQueryOptions<TData = FindZoningDistrictByZoningDistrictId["response"], TQueryData = FindZoningDistrictByZoningDistrictId["response"]>(id: FindZoningDistrictByZoningDistrictIdPathParams["id"], options: FindZoningDistrictByZoningDistrictId["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindZoningDistrictByZoningDistrictId["response"], FindZoningDistrictByZoningDistrictId["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findZoningDistrictByZoningDistrictIdQueryKey(id);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindZoningDistrictByZoningDistrictId["data"], FindZoningDistrictByZoningDistrictId["error"]>({
                method: "get",
                url: `/zoning-districts/${id}`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Non-spatial details for a specific zoning district
     * @link /zoning-districts/:id */
export function useFindZoningDistrictByZoningDistrictId<TData = FindZoningDistrictByZoningDistrictId["response"], TQueryData = FindZoningDistrictByZoningDistrictId["response"], TQueryKey extends QueryKey = FindZoningDistrictByZoningDistrictIdQueryKey>(id: FindZoningDistrictByZoningDistrictIdPathParams["id"], options: {
    query?: Partial<UseBaseQueryOptions<FindZoningDistrictByZoningDistrictId["response"], FindZoningDistrictByZoningDistrictId["error"], TData, TQueryData, TQueryKey>>;
    client?: FindZoningDistrictByZoningDistrictId["client"]["parameters"];
} = {}): UseQueryResult<TData, FindZoningDistrictByZoningDistrictId["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findZoningDistrictByZoningDistrictIdQueryKey(id);
    const query = useQuery<FindZoningDistrictByZoningDistrictId["data"], FindZoningDistrictByZoningDistrictId["error"], TData, any>({
        ...findZoningDistrictByZoningDistrictIdQueryOptions<TData, TQueryData>(id, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindZoningDistrictByZoningDistrictId["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}