import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindZoningDistrictClassByZoningDistrictClassIdQueryResponse, FindZoningDistrictClassByZoningDistrictClassIdPathParams, FindZoningDistrictClassByZoningDistrictClassId400, FindZoningDistrictClassByZoningDistrictClassId404, FindZoningDistrictClassByZoningDistrictClassId500 } from "../types/FindZoningDistrictClassByZoningDistrictClassId";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindZoningDistrictClassByZoningDistrictClassIdClient = typeof client<FindZoningDistrictClassByZoningDistrictClassIdQueryResponse, FindZoningDistrictClassByZoningDistrictClassId400 | FindZoningDistrictClassByZoningDistrictClassId404 | FindZoningDistrictClassByZoningDistrictClassId500, never>;
type FindZoningDistrictClassByZoningDistrictClassId = {
    data: FindZoningDistrictClassByZoningDistrictClassIdQueryResponse;
    error: FindZoningDistrictClassByZoningDistrictClassId400 | FindZoningDistrictClassByZoningDistrictClassId404 | FindZoningDistrictClassByZoningDistrictClassId500;
    request: never;
    pathParams: FindZoningDistrictClassByZoningDistrictClassIdPathParams;
    queryParams: never;
    headerParams: never;
    response: FindZoningDistrictClassByZoningDistrictClassIdQueryResponse;
    client: {
        parameters: Partial<Parameters<FindZoningDistrictClassByZoningDistrictClassIdClient>[0]>;
        return: Awaited<ReturnType<FindZoningDistrictClassByZoningDistrictClassIdClient>>;
    };
};
export const findZoningDistrictClassByZoningDistrictClassIdQueryKey = (id: FindZoningDistrictClassByZoningDistrictClassIdPathParams["id"]) => [{ url: "/zoning-district-classes/:id", params: { id: id } }] as const;
export type FindZoningDistrictClassByZoningDistrictClassIdQueryKey = ReturnType<typeof findZoningDistrictClassByZoningDistrictClassIdQueryKey>;
export function findZoningDistrictClassByZoningDistrictClassIdQueryOptions<TData = FindZoningDistrictClassByZoningDistrictClassId["response"], TQueryData = FindZoningDistrictClassByZoningDistrictClassId["response"]>(id: FindZoningDistrictClassByZoningDistrictClassIdPathParams["id"], options: FindZoningDistrictClassByZoningDistrictClassId["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindZoningDistrictClassByZoningDistrictClassId["response"], FindZoningDistrictClassByZoningDistrictClassId["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findZoningDistrictClassByZoningDistrictClassIdQueryKey(id);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindZoningDistrictClassByZoningDistrictClassId["data"], FindZoningDistrictClassByZoningDistrictClassId["error"]>({
                method: "get",
                url: `/zoning-district-classes/${id}`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Class schema for the specified class
     * @link /zoning-district-classes/:id */
export function useFindZoningDistrictClassByZoningDistrictClassId<TData = FindZoningDistrictClassByZoningDistrictClassId["response"], TQueryData = FindZoningDistrictClassByZoningDistrictClassId["response"], TQueryKey extends QueryKey = FindZoningDistrictClassByZoningDistrictClassIdQueryKey>(id: FindZoningDistrictClassByZoningDistrictClassIdPathParams["id"], options: {
    query?: Partial<UseBaseQueryOptions<FindZoningDistrictClassByZoningDistrictClassId["response"], FindZoningDistrictClassByZoningDistrictClassId["error"], TData, TQueryData, TQueryKey>>;
    client?: FindZoningDistrictClassByZoningDistrictClassId["client"]["parameters"];
} = {}): UseQueryResult<TData, FindZoningDistrictClassByZoningDistrictClassId["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findZoningDistrictClassByZoningDistrictClassIdQueryKey(id);
    const query = useQuery<FindZoningDistrictClassByZoningDistrictClassId["data"], FindZoningDistrictClassByZoningDistrictClassId["error"], TData, any>({
        ...findZoningDistrictClassByZoningDistrictClassIdQueryOptions<TData, TQueryData>(id, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindZoningDistrictClassByZoningDistrictClassId["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}