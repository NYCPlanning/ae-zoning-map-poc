import { http } from "msw";
import { createFindBoroughsQueryResponse } from "./createFindBoroughs";

export const findBoroughsHandler = http.get("*/boroughs", function handler(info) {
    return new Response(JSON.stringify(createFindBoroughsQueryResponse()), {
        headers: {
            "Content-Type": "application/json",
        },
    });
});