import { http } from "msw";
import { createFindZoningDistrictsByTaxLotBblQueryResponse } from "./createFindZoningDistrictsByTaxLotBbl";

export const findZoningDistrictsByTaxLotBblHandler = http.get("*/tax-lots/:bbl/zoning-districts", function handler(info) {
    return new Response(JSON.stringify(createFindZoningDistrictsByTaxLotBblQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});