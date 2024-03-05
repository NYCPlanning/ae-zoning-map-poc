import { http } from "msw";
import { createFindZoningDistrictClassesByTaxLotBblQueryResponse } from "./createFindZoningDistrictClassesByTaxLotBbl";

export const findZoningDistrictClassesByTaxLotBblHandler = http.get("*/tax-lots/:bbl/zoning-districts/classes", function handler(info) {
    return new Response(JSON.stringify(createFindZoningDistrictClassesByTaxLotBblQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});