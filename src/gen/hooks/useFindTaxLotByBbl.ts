import client from "../../client.ts";
import { useQuery } from "@tanstack/react-query";
import type { FindTaxLotByBblQueryResponse, FindTaxLotByBblPathParams, FindTaxLotByBbl400, FindTaxLotByBbl404, FindTaxLotByBbl500 } from "../types/FindTaxLotByBbl";
import type { UseBaseQueryOptions, UseQueryResult, QueryKey, WithRequired } from "@tanstack/react-query";

type FindTaxLotByBblClient = typeof client<FindTaxLotByBblQueryResponse, FindTaxLotByBbl400 | FindTaxLotByBbl404 | FindTaxLotByBbl500, never>;
type FindTaxLotByBbl = {
    data: FindTaxLotByBblQueryResponse;
    error: FindTaxLotByBbl400 | FindTaxLotByBbl404 | FindTaxLotByBbl500;
    request: never;
    pathParams: FindTaxLotByBblPathParams;
    queryParams: never;
    headerParams: never;
    response: FindTaxLotByBblQueryResponse;
    client: {
        parameters: Partial<Parameters<FindTaxLotByBblClient>[0]>;
        return: Awaited<ReturnType<FindTaxLotByBblClient>>;
    };
};
export const findTaxLotByBblQueryKey = (bbl: FindTaxLotByBblPathParams["bbl"]) => [{ url: "/tax-lots/:bbl", params: { bbl: bbl } }] as const;
export type FindTaxLotByBblQueryKey = ReturnType<typeof findTaxLotByBblQueryKey>;
export function findTaxLotByBblQueryOptions<TData = FindTaxLotByBbl["response"], TQueryData = FindTaxLotByBbl["response"]>(bbl: FindTaxLotByBblPathParams["bbl"], options: FindTaxLotByBbl["client"]["parameters"] = {}): WithRequired<UseBaseQueryOptions<FindTaxLotByBbl["response"], FindTaxLotByBbl["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = findTaxLotByBblQueryKey(bbl);
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<FindTaxLotByBbl["data"], FindTaxLotByBbl["error"]>({
                method: "get",
                url: `/tax-lots/${bbl}`,
                ...options
            });
            return res.data;
        },
    };
}
/**
     * @summary Non-spatial details for a specific tax lot
     * @link /tax-lots/:bbl */
export function useFindTaxLotByBbl<TData = FindTaxLotByBbl["response"], TQueryData = FindTaxLotByBbl["response"], TQueryKey extends QueryKey = FindTaxLotByBblQueryKey>(bbl: FindTaxLotByBblPathParams["bbl"], options: {
    query?: Partial<UseBaseQueryOptions<FindTaxLotByBbl["response"], FindTaxLotByBbl["error"], TData, TQueryData, TQueryKey>>;
    client?: FindTaxLotByBbl["client"]["parameters"];
} = {}): UseQueryResult<TData, FindTaxLotByBbl["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? findTaxLotByBblQueryKey(bbl);
    const query = useQuery<FindTaxLotByBbl["data"], FindTaxLotByBbl["error"], TData, any>({
        ...findTaxLotByBblQueryOptions<TData, TQueryData>(bbl, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryResult<TData, FindTaxLotByBbl["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}