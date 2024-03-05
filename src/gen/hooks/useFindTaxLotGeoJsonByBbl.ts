import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindTaxLotGeoJsonByBblQueryResponse, FindTaxLotGeoJsonByBblPathParams, FindTaxLotGeoJsonByBbl400, FindTaxLotGeoJsonByBbl404, FindTaxLotGeoJsonByBbl500 } from "../types/FindTaxLotGeoJsonByBbl";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindTaxLotGeoJsonByBblClient = typeof client<FindTaxLotGeoJsonByBblQueryResponse, FindTaxLotGeoJsonByBbl400 | FindTaxLotGeoJsonByBbl404 | FindTaxLotGeoJsonByBbl500, never>;
type FindTaxLotGeoJsonByBbl = {
    data: FindTaxLotGeoJsonByBblQueryResponse;
    error: FindTaxLotGeoJsonByBbl400 | FindTaxLotGeoJsonByBbl404 | FindTaxLotGeoJsonByBbl500;
    request: never;
    pathParams: FindTaxLotGeoJsonByBblPathParams;
    queryParams: never;
    headerParams: never;
    response: FindTaxLotGeoJsonByBblQueryResponse;
    client: {
        parameters: Partial<Parameters<FindTaxLotGeoJsonByBblClient>[0]>;
        return: Awaited<ReturnType<FindTaxLotGeoJsonByBblClient>>;
    };
};
export const findTaxLotGeoJsonByBblQueryKey = (bbl: FindTaxLotGeoJsonByBblPathParams["bbl"]) => [{ url: "/tax-lots/:bbl/geojson", params: { bbl: bbl } }] as const;
export type FindTaxLotGeoJsonByBblQueryKey = ReturnType<typeof findTaxLotGeoJsonByBblQueryKey>;
export function findTaxLotGeoJsonByBblQueryOptions<TData = FindTaxLotGeoJsonByBbl["response"], TQueryData = FindTaxLotGeoJsonByBbl["response"]>(bbl: FindTaxLotGeoJsonByBblPathParams["bbl"], options: FindTaxLotGeoJsonByBbl["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindTaxLotGeoJsonByBbl["response"], FindTaxLotGeoJsonByBbl["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findTaxLotGeoJsonByBblQueryKey(bbl);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindTaxLotGeoJsonByBbl["data"], FindTaxLotGeoJsonByBbl["error"]>({
                method: "get",
                url: `/tax-lots/${bbl}/geojson`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary GeoJSON for a specific tax lot
     * @link /tax-lots/:bbl/geojson */
export function useFindTaxLotGeoJsonByBbl<TData = FindTaxLotGeoJsonByBbl["response"], TQueryData = FindTaxLotGeoJsonByBbl["response"], TQueryKey extends QueryKey = FindTaxLotGeoJsonByBblQueryKey>(bbl: FindTaxLotGeoJsonByBblPathParams["bbl"], options: {
    query?: Partial<UseBaseQueryOptions<FindTaxLotGeoJsonByBbl["response"], FindTaxLotGeoJsonByBbl["error"], TData, TQueryData, TQueryKey>>;
    client?: FindTaxLotGeoJsonByBbl["client"]["parameters"];
} = {}): UseQueryResult<TData, FindTaxLotGeoJsonByBbl["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findTaxLotGeoJsonByBblQueryKey(bbl);
    const query = useQuery<FindTaxLotGeoJsonByBbl["data"], FindTaxLotGeoJsonByBbl["error"], TData, any>({
        ...findTaxLotGeoJsonByBblQueryOptions<TData, TQueryData>(bbl, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindTaxLotGeoJsonByBbl["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}