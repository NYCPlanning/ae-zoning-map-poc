import React from "react";
import { describe, expect, it } from "@jest/globals";
import LocationSearch from "../../src/components/LocationSearch";

describe("LocationSearch", () => {
  it("receive a mocked response to API request", async () => {
    const response = await fetch("http://localhost:3000/api/boroughs");
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
  });
});
