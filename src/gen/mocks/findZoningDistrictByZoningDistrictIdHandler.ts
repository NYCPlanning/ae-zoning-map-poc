import { http } from "msw";
import { createFindZoningDistrictByZoningDistrictIdQueryResponse } from "./createFindZoningDistrictByZoningDistrictId";

export const findZoningDistrictByZoningDistrictIdHandler = http.get("*/zoning-districts/:id", function handler(info) {
    return new Response(JSON.stringify(createFindZoningDistrictByZoningDistrictIdQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});