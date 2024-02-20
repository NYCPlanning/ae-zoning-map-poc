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
    await expect(page.getByText("120 BROADWAY", { exact: true })).toBeVisible();
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
    await expect(
      page.getByText("Tax Lot: BBL4017870020", { exact: true }),
    ).toBeVisible();
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
    await expect(page.getByText("Tax Lot:", { exact: true })).not.toBeVisible();
  });
});

// Tests using our API

test.describe("Can search for a Tax Lot by BBL and see the details for a corresponding tax lot", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:5173/");
    await page.getByLabel("Borough").selectOption("1");
    await page.getByLabel("Block").fill("47");
    await page.getByLabel("Lot", { exact: true }).fill("7501");
    await page.getByRole("button", { name: "Search", exact: true }).click();
  });

  test("Tax lot details show correctly", async ({ page }) => {
    await expect(page.getByText("120 BROADWAY", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Tax Lot: BBL1000477501", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Manhattan (Borough 1)", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("47", { exact: true })).toBeVisible();
    await expect(page.getByText("7501", { exact: true })).toBeVisible();
    await expect(
      page.getByText(/Land Use:.*Commercial & Office Buildings/, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText("C5-5", { exact: true })).toBeVisible();
    await expect(page.getByText("47,539 sq ft", { exact: true })).toBeVisible();
    await expect(page.getByText("195.17 ft", { exact: true })).toBeVisible();
    await expect(page.getByText("249.33 ft", { exact: true })).toBeVisible();
  });
});

test("Can search for a Tax Lot by BBL - Search for nonexistent BBL shows nothing", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Borough").selectOption("1");
  await page.getByLabel("Block").fill("X");
  await page.getByLabel("Lot", { exact: true }).fill("Y");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByText("Tax Lot:", { exact: true })).not.toBeVisible();
});
