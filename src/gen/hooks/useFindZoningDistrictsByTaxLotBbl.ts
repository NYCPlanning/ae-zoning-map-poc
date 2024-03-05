import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindZoningDistrictsByTaxLotBblQueryResponse, FindZoningDistrictsByTaxLotBblPathParams, FindZoningDistrictsByTaxLotBbl400, FindZoningDistrictsByTaxLotBbl404, FindZoningDistrictsByTaxLotBbl500 } from "../types/FindZoningDistrictsByTaxLotBbl";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindZoningDistrictsByTaxLotBblClient = typeof client<FindZoningDistrictsByTaxLotBblQueryResponse, FindZoningDistrictsByTaxLotBbl400 | FindZoningDistrictsByTaxLotBbl404 | FindZoningDistrictsByTaxLotBbl500, never>;
type FindZoningDistrictsByTaxLotBbl = {
    data: FindZoningDistrictsByTaxLotBblQueryResponse;
    error: FindZoningDistrictsByTaxLotBbl400 | FindZoningDistrictsByTaxLotBbl404 | FindZoningDistrictsByTaxLotBbl500;
    request: never;
    pathParams: FindZoningDistrictsByTaxLotBblPathParams;
    queryParams: never;
    headerParams: never;
    response: FindZoningDistrictsByTaxLotBblQueryResponse;
    client: {
        parameters: Partial<Parameters<FindZoningDistrictsByTaxLotBblClient>[0]>;
        return: Awaited<ReturnType<FindZoningDistrictsByTaxLotBblClient>>;
    };
};
export const findZoningDistrictsByTaxLotBblQueryKey = (bbl: FindZoningDistrictsByTaxLotBblPathParams["bbl"]) => [{ url: "/tax-lots/:bbl/zoning-districts", params: { bbl: bbl } }] as const;
export type FindZoningDistrictsByTaxLotBblQueryKey = ReturnType<typeof findZoningDistrictsByTaxLotBblQueryKey>;
export function findZoningDistrictsByTaxLotBblQueryOptions<TData = FindZoningDistrictsByTaxLotBbl["response"], TQueryData = FindZoningDistrictsByTaxLotBbl["response"]>(bbl: FindZoningDistrictsByTaxLotBblPathParams["bbl"], options: FindZoningDistrictsByTaxLotBbl["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindZoningDistrictsByTaxLotBbl["response"], FindZoningDistrictsByTaxLotBbl["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findZoningDistrictsByTaxLotBblQueryKey(bbl);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindZoningDistrictsByTaxLotBbl["data"], FindZoningDistrictsByTaxLotBbl["error"]>({
                method: "get",
                url: `/tax-lots/${bbl}/zoning-districts`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Non-spatial details for zoning districts that spatially intersect a tax lot.
     * @link /tax-lots/:bbl/zoning-districts */
export function useFindZoningDistrictsByTaxLotBbl<TData = FindZoningDistrictsByTaxLotBbl["response"], TQueryData = FindZoningDistrictsByTaxLotBbl["response"], TQueryKey extends QueryKey = FindZoningDistrictsByTaxLotBblQueryKey>(bbl: FindZoningDistrictsByTaxLotBblPathParams["bbl"], options: {
    query?: Partial<UseBaseQueryOptions<FindZoningDistrictsByTaxLotBbl["response"], FindZoningDistrictsByTaxLotBbl["error"], TData, TQueryData, TQueryKey>>;
    client?: FindZoningDistrictsByTaxLotBbl["client"]["parameters"];
} = {}): UseQueryResult<TData, FindZoningDistrictsByTaxLotBbl["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findZoningDistrictsByTaxLotBblQueryKey(bbl);
    const query = useQuery<FindZoningDistrictsByTaxLotBbl["data"], FindZoningDistrictsByTaxLotBbl["error"], TData, any>({
        ...findZoningDistrictsByTaxLotBblQueryOptions<TData, TQueryData>(bbl, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindZoningDistrictsByTaxLotBbl["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}