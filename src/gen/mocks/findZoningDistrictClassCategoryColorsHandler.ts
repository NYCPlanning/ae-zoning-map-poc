import { http } from "msw";
import { createFindZoningDistrictClassCategoryColorsQueryResponse } from "./createFindZoningDistrictClassCategoryColors";

export const findZoningDistrictClassCategoryColorsHandler = http.get("*/zoning-district-classes/category-colors", function handler(info) {
    return new Response(JSON.stringify(createFindZoningDistrictClassCategoryColorsQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});