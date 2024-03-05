import { http } from "msw";
import { createFindTaxLotByBblQueryResponse } from "./createFindTaxLotByBbl";

export const findTaxLotByBblHandler = http.get("*/tax-lots/:bbl", function handler(info) {
    return new Response(JSON.stringify(createFindTaxLotByBblQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});