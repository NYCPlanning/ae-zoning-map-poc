import { http } from "msw";
import { createFindTaxLotGeoJsonByBblQueryResponse } from "./createFindTaxLotGeoJsonByBbl";

export const findTaxLotGeoJsonByBblHandler = http.get("*/tax-lots/:bbl/geojson", function handler(info) {
    return new Response(JSON.stringify(createFindTaxLotGeoJsonByBblQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});