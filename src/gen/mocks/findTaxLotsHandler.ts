import { http } from "msw";
import { createFindTaxLotsQueryResponse } from "./createFindTaxLots";

export const findTaxLotsHandler = http.get("*/tax-lots", function handler(info) {
    return new Response(JSON.stringify(createFindTaxLotsQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});