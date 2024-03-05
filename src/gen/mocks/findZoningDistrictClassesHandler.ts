import { http } from "msw";
import { createFindZoningDistrictClassesQueryResponse } from "./createFindZoningDistrictClasses";

export const findZoningDistrictClassesHandler = http.get("*/zoning-district-classes", function handler(info) {
    return new Response(JSON.stringify(createFindZoningDistrictClassesQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});