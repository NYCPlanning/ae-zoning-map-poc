import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindZoningDistrictClassCategoryColorsQueryResponse, FindZoningDistrictClassCategoryColors400, FindZoningDistrictClassCategoryColors500 } from "../types/FindZoningDistrictClassCategoryColors";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindZoningDistrictClassCategoryColorsClient = typeof client<FindZoningDistrictClassCategoryColorsQueryResponse, FindZoningDistrictClassCategoryColors400 | FindZoningDistrictClassCategoryColors500, never>;
type FindZoningDistrictClassCategoryColors = {
    data: FindZoningDistrictClassCategoryColorsQueryResponse;
    error: FindZoningDistrictClassCategoryColors400 | FindZoningDistrictClassCategoryColors500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: FindZoningDistrictClassCategoryColorsQueryResponse;
    client: {
        parameters: Partial<Parameters<FindZoningDistrictClassCategoryColorsClient>[0]>;
        return: Awaited<ReturnType<FindZoningDistrictClassCategoryColorsClient>>;
    };
};
export const findZoningDistrictClassCategoryColorsQueryKey = () => [{ url: "/zoning-district-classes/category-colors" }] as const;
export type FindZoningDistrictClassCategoryColorsQueryKey = ReturnType<typeof findZoningDistrictClassCategoryColorsQueryKey>;
export function findZoningDistrictClassCategoryColorsQueryOptions<TData = FindZoningDistrictClassCategoryColors["response"], TQueryData = FindZoningDistrictClassCategoryColors["response"]>(options: FindZoningDistrictClassCategoryColors["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindZoningDistrictClassCategoryColors["response"], FindZoningDistrictClassCategoryColors["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findZoningDistrictClassCategoryColorsQueryKey();
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindZoningDistrictClassCategoryColors["data"], FindZoningDistrictClassCategoryColors["error"]>({
                method: "get",
                url: `/zoning-district-classes/category-colors`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary List of color and class category
     * @link /zoning-district-classes/category-colors */
export function useFindZoningDistrictClassCategoryColors<TData = FindZoningDistrictClassCategoryColors["response"], TQueryData = FindZoningDistrictClassCategoryColors["response"], TQueryKey extends QueryKey = FindZoningDistrictClassCategoryColorsQueryKey>(options: {
    query?: Partial<UseBaseQueryOptions<FindZoningDistrictClassCategoryColors["response"], FindZoningDistrictClassCategoryColors["error"], TData, TQueryData, TQueryKey>>;
    client?: FindZoningDistrictClassCategoryColors["client"]["parameters"];
} = {}): UseQueryResult<TData, FindZoningDistrictClassCategoryColors["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findZoningDistrictClassCategoryColorsQueryKey();
    const query = useQuery<FindZoningDistrictClassCategoryColors["data"], FindZoningDistrictClassCategoryColors["error"], TData, any>({
        ...findZoningDistrictClassCategoryColorsQueryOptions<TData, TQueryData>(clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindZoningDistrictClassCategoryColors["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}