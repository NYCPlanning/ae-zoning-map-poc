import { http } from "msw";
import { createFindZoningDistrictClassesByZoningDistrictIdQueryResponse } from "./createFindZoningDistrictClassesByZoningDistrictId";

export const findZoningDistrictClassesByZoningDistrictIdHandler = http.get("*/zoning-districts/:id/classes", function handler(info) {
    return new Response(JSON.stringify(createFindZoningDistrictClassesByZoningDistrictIdQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});