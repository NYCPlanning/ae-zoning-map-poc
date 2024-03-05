import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindZoningDistrictClassesByTaxLotBblQueryResponse, FindZoningDistrictClassesByTaxLotBblPathParams, FindZoningDistrictClassesByTaxLotBbl400, FindZoningDistrictClassesByTaxLotBbl404, FindZoningDistrictClassesByTaxLotBbl500 } from "../types/FindZoningDistrictClassesByTaxLotBbl";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindZoningDistrictClassesByTaxLotBblClient = typeof client<FindZoningDistrictClassesByTaxLotBblQueryResponse, FindZoningDistrictClassesByTaxLotBbl400 | FindZoningDistrictClassesByTaxLotBbl404 | FindZoningDistrictClassesByTaxLotBbl500, never>;
type FindZoningDistrictClassesByTaxLotBbl = {
    data: FindZoningDistrictClassesByTaxLotBblQueryResponse;
    error: FindZoningDistrictClassesByTaxLotBbl400 | FindZoningDistrictClassesByTaxLotBbl404 | FindZoningDistrictClassesByTaxLotBbl500;
    request: never;
    pathParams: FindZoningDistrictClassesByTaxLotBblPathParams;
    queryParams: never;
    headerParams: never;
    response: FindZoningDistrictClassesByTaxLotBblQueryResponse;
    client: {
        parameters: Partial<Parameters<FindZoningDistrictClassesByTaxLotBblClient>[0]>;
        return: Awaited<ReturnType<FindZoningDistrictClassesByTaxLotBblClient>>;
    };
};
export const findZoningDistrictClassesByTaxLotBblQueryKey = (bbl: FindZoningDistrictClassesByTaxLotBblPathParams["bbl"]) => [{ url: "/tax-lots/:bbl/zoning-districts/classes", params: { bbl: bbl } }] as const;
export type FindZoningDistrictClassesByTaxLotBblQueryKey = ReturnType<typeof findZoningDistrictClassesByTaxLotBblQueryKey>;
export function findZoningDistrictClassesByTaxLotBblQueryOptions<TData = FindZoningDistrictClassesByTaxLotBbl["response"], TQueryData = FindZoningDistrictClassesByTaxLotBbl["response"]>(bbl: FindZoningDistrictClassesByTaxLotBblPathParams["bbl"], options: FindZoningDistrictClassesByTaxLotBbl["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindZoningDistrictClassesByTaxLotBbl["response"], FindZoningDistrictClassesByTaxLotBbl["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findZoningDistrictClassesByTaxLotBblQueryKey(bbl);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindZoningDistrictClassesByTaxLotBbl["data"], FindZoningDistrictClassesByTaxLotBbl["error"]>({
                method: "get",
                url: `/tax-lots/${bbl}/zoning-districts/classes`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Class schemas for all zoning districts that spatially intersect the tax lot
     * @link /tax-lots/:bbl/zoning-districts/classes */
export function useFindZoningDistrictClassesByTaxLotBbl<TData = FindZoningDistrictClassesByTaxLotBbl["response"], TQueryData = FindZoningDistrictClassesByTaxLotBbl["response"], TQueryKey extends QueryKey = FindZoningDistrictClassesByTaxLotBblQueryKey>(bbl: FindZoningDistrictClassesByTaxLotBblPathParams["bbl"], options: {
    query?: Partial<UseBaseQueryOptions<FindZoningDistrictClassesByTaxLotBbl["response"], FindZoningDistrictClassesByTaxLotBbl["error"], TData, TQueryData, TQueryKey>>;
    client?: FindZoningDistrictClassesByTaxLotBbl["client"]["parameters"];
} = {}): UseQueryResult<TData, FindZoningDistrictClassesByTaxLotBbl["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findZoningDistrictClassesByTaxLotBblQueryKey(bbl);
    const query = useQuery<FindZoningDistrictClassesByTaxLotBbl["data"], FindZoningDistrictClassesByTaxLotBbl["error"], TData, any>({
        ...findZoningDistrictClassesByTaxLotBblQueryOptions<TData, TQueryData>(bbl, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindZoningDistrictClassesByTaxLotBbl["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}