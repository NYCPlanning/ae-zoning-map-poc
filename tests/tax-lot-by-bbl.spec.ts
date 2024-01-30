import { test, expect } from "@playwright/test";

test.describe("Using a mock API, can search for a Tax Lot by BBL and see the details for a corresponding tax lot", () => {
  test("Address shows correctly", async ({ page }) => {
    // Mock the api call before navigating
    await page.route(
      "http://localhost:3000/api/tax-lots/1000477501",
      async (route) => {
        const json = {
          bbl: "1000477501",
          block: "47",
          lot: "7501",
          address: "120 BROADWAY",
          borough: {
            id: "1",
            title: "Manhattan",
            abbr: "MN",
          },
          landUse: {
            id: "05",
            description: "Commercial & Office Buildings",
            color: "#fc2929ff",
          },
        };
        await route.fulfill({ json });
      },
    );
    // Go to the page
    await page.goto("http://localhost:5173/");
    await page.getByLabel("Borough").selectOption("1");
    await page.getByLabel("Block").fill("47");
    await page.getByLabel("Lot", { exact: true }).fill("7501");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(
      page.locator("div").filter({ hasText: "120 BROADWAY" }).nth(2),
    ).toBeVisible();
  });

  test("BBL shows correctly", async ({ page }) => {
    // Mock the api call before navigating
    await page.route(
      "http://localhost:3000/api/tax-lots/4017870020",
      async (route) => {
        const json = {
          bbl: "4017870020",
          block: "1787",
          lot: "20",
          address: "123-01 ROOSEVELT AVENUE",
          borough: {
            id: "4",
            title: "Queens",
            abbr: "QN",
          },
          landUse: {
            id: "09",
            description: "Open Space & Outdoor Recreation",
            color: "#78d271ff",
          },
        };
        await route.fulfill({ json });
      },
    );
    // Go to the page
    await page.goto("http://localhost:5173/");
    await page.getByLabel("Borough").selectOption("4");
    await page.getByLabel("Block").fill("1787");
    await page.getByLabel("Lot", { exact: true }).fill("20");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page.locator(".css-1yf3ulg")).toContainText(
      "Tax Lot: BBL4017870020",
    );
    console.log("page.locator('.css-1yf3ulg')", page.locator(".css-1yf3ulg"));
  });

  test("Search for nonexistent BBL shows nothing", async ({ page }) => {
    // Get the response from the HAR file
    await page.routeFromHAR("./tests/hars/tax-lots.400.har", {
      url: "http://localhost:3000/api/tax-lots/10000X000Y",
      update: false,
    });
    // Go to the page
    await page.goto("http://localhost:5173/");
    await page.getByLabel("Borough").selectOption("1");
    await page.getByLabel("Block").fill("X");
    await page.getByLabel("Lot", { exact: true }).fill("Y");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page.locator(".css-1yf3ulg")).not.toHaveClass(["css-1yf3ulg"]);
  });
});

// Tests using our API

test.describe("Can search for a Tax Lot by BBL and see the details for a corresponding tax lot", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:5173/");
  });

  test("Address shows correctly", async ({ page }) => {
    await page.getByLabel("Borough").selectOption("1");
    await page.getByLabel("Block").fill("47");
    await page.getByLabel("Lot", { exact: true }).fill("7501");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(
      page.locator("div").filter({ hasText: "120 BROADWAY" }).nth(2),
    ).toBeVisible();
  });

  test("BBL shows correctly", async ({ page }) => {
    await page.getByLabel("Borough").selectOption("4");
    await page.getByLabel("Block").fill("1787");
    await page.getByLabel("Lot", { exact: true }).fill("20");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page.locator(".css-1yf3ulg")).toContainText(
      "Tax Lot: BBL4017870020",
    );
  });

  test("Search for nonexistent BBL shows nothing", async ({ page }) => {
    await page.getByLabel("Borough").selectOption("1");
    await page.getByLabel("Block").fill("X");
    await page.getByLabel("Lot", { exact: true }).fill("Y");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page.locator(".css-1yf3ulg")).not.toHaveClass(["css-1yf3ulg"]);
  });
});
