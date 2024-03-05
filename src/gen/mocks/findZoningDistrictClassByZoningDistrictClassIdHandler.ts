import { http } from "msw";
import { createFindZoningDistrictClassByZoningDistrictClassIdQueryResponse } from "./createFindZoningDistrictClassByZoningDistrictClassId";

export const findZoningDistrictClassByZoningDistrictClassIdHandler = http.get("*/zoning-district-classes/:id", function handler(info) {
    return new Response(JSON.stringify(createFindZoningDistrictClassByZoningDistrictClassIdQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});