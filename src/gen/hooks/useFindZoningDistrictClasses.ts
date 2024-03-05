import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindZoningDistrictClassesQueryResponse, FindZoningDistrictClasses400, FindZoningDistrictClasses500 } from "../types/FindZoningDistrictClasses";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindZoningDistrictClassesClient = typeof client<FindZoningDistrictClassesQueryResponse, FindZoningDistrictClasses400 | FindZoningDistrictClasses500, never>;
type FindZoningDistrictClasses = {
    data: FindZoningDistrictClassesQueryResponse;
    error: FindZoningDistrictClasses400 | FindZoningDistrictClasses500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: FindZoningDistrictClassesQueryResponse;
    client: {
        parameters: Partial<Parameters<FindZoningDistrictClassesClient>[0]>;
        return: Awaited<ReturnType<FindZoningDistrictClassesClient>>;
    };
};
export const findZoningDistrictClassesQueryKey = () => [{ url: "/zoning-district-classes" }] as const;
export type FindZoningDistrictClassesQueryKey = ReturnType<typeof findZoningDistrictClassesQueryKey>;
export function findZoningDistrictClassesQueryOptions<TData = FindZoningDistrictClasses["response"], TQueryData = FindZoningDistrictClasses["response"]>(options: FindZoningDistrictClasses["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindZoningDistrictClasses["response"], FindZoningDistrictClasses["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findZoningDistrictClassesQueryKey();
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindZoningDistrictClasses["data"], FindZoningDistrictClasses["error"]>({
                method: "get",
                url: `/zoning-district-classes`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Class schemas for all zoning districts
     * @link /zoning-district-classes */
export function useFindZoningDistrictClasses<TData = FindZoningDistrictClasses["response"], TQueryData = FindZoningDistrictClasses["response"], TQueryKey extends QueryKey = FindZoningDistrictClassesQueryKey>(options: {
    query?: Partial<UseBaseQueryOptions<FindZoningDistrictClasses["response"], FindZoningDistrictClasses["error"], TData, TQueryData, TQueryKey>>;
    client?: FindZoningDistrictClasses["client"]["parameters"];
} = {}): UseQueryResult<TData, FindZoningDistrictClasses["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findZoningDistrictClassesQueryKey();
    const query = useQuery<FindZoningDistrictClasses["data"], FindZoningDistrictClasses["error"], TData, any>({
        ...findZoningDistrictClassesQueryOptions<TData, TQueryData>(clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindZoningDistrictClasses["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}