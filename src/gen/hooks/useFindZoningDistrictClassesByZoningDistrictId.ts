import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindZoningDistrictClassesByZoningDistrictIdQueryResponse, FindZoningDistrictClassesByZoningDistrictIdPathParams, FindZoningDistrictClassesByZoningDistrictId400, FindZoningDistrictClassesByZoningDistrictId404, FindZoningDistrictClassesByZoningDistrictId500 } from "../types/FindZoningDistrictClassesByZoningDistrictId";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindZoningDistrictClassesByZoningDistrictIdClient = typeof client<FindZoningDistrictClassesByZoningDistrictIdQueryResponse, FindZoningDistrictClassesByZoningDistrictId400 | FindZoningDistrictClassesByZoningDistrictId404 | FindZoningDistrictClassesByZoningDistrictId500, never>;
type FindZoningDistrictClassesByZoningDistrictId = {
    data: FindZoningDistrictClassesByZoningDistrictIdQueryResponse;
    error: FindZoningDistrictClassesByZoningDistrictId400 | FindZoningDistrictClassesByZoningDistrictId404 | FindZoningDistrictClassesByZoningDistrictId500;
    request: never;
    pathParams: FindZoningDistrictClassesByZoningDistrictIdPathParams;
    queryParams: never;
    headerParams: never;
    response: FindZoningDistrictClassesByZoningDistrictIdQueryResponse;
    client: {
        parameters: Partial<Parameters<FindZoningDistrictClassesByZoningDistrictIdClient>[0]>;
        return: Awaited<ReturnType<FindZoningDistrictClassesByZoningDistrictIdClient>>;
    };
};
export const findZoningDistrictClassesByZoningDistrictIdQueryKey = (id: FindZoningDistrictClassesByZoningDistrictIdPathParams["id"]) => [{ url: "/zoning-districts/:id/classes", params: { id: id } }] as const;
export type FindZoningDistrictClassesByZoningDistrictIdQueryKey = ReturnType<typeof findZoningDistrictClassesByZoningDistrictIdQueryKey>;
export function findZoningDistrictClassesByZoningDistrictIdQueryOptions<TData = FindZoningDistrictClassesByZoningDistrictId["response"], TQueryData = FindZoningDistrictClassesByZoningDistrictId["response"]>(id: FindZoningDistrictClassesByZoningDistrictIdPathParams["id"], options: FindZoningDistrictClassesByZoningDistrictId["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindZoningDistrictClassesByZoningDistrictId["response"], FindZoningDistrictClassesByZoningDistrictId["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findZoningDistrictClassesByZoningDistrictIdQueryKey(id);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindZoningDistrictClassesByZoningDistrictId["data"], FindZoningDistrictClassesByZoningDistrictId["error"]>({
                method: "get",
                url: `/zoning-districts/${id}/classes`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Class schemas for the specified zoning district
     * @link /zoning-districts/:id/classes */
export function useFindZoningDistrictClassesByZoningDistrictId<TData = FindZoningDistrictClassesByZoningDistrictId["response"], TQueryData = FindZoningDistrictClassesByZoningDistrictId["response"], TQueryKey extends QueryKey = FindZoningDistrictClassesByZoningDistrictIdQueryKey>(id: FindZoningDistrictClassesByZoningDistrictIdPathParams["id"], options: {
    query?: Partial<UseBaseQueryOptions<FindZoningDistrictClassesByZoningDistrictId["response"], FindZoningDistrictClassesByZoningDistrictId["error"], TData, TQueryData, TQueryKey>>;
    client?: FindZoningDistrictClassesByZoningDistrictId["client"]["parameters"];
} = {}): UseQueryResult<TData, FindZoningDistrictClassesByZoningDistrictId["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findZoningDistrictClassesByZoningDistrictIdQueryKey(id);
    const query = useQuery<FindZoningDistrictClassesByZoningDistrictId["data"], FindZoningDistrictClassesByZoningDistrictId["error"], TData, any>({
        ...findZoningDistrictClassesByZoningDistrictIdQueryOptions<TData, TQueryData>(id, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindZoningDistrictClassesByZoningDistrictId["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}