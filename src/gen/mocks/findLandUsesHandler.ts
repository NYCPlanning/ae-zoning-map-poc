import { http } from "msw";
import { createFindLandUsesQueryResponse } from "./createFindLandUses";

export const findLandUsesHandler = http.get("*/land-uses", function handler(info) {
    return new Response(JSON.stringify(createFindLandUsesQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});