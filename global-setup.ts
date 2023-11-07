// import { chromium, FullConfig, Page, expect } from "@playwright/test";
//
// export default async function globalSetup(config: FullConfig) {
//   const { baseURL, storageState, headless } = config.projects[0].use;
//
//   const browser = await chromium.launch({ headless });
//   const context = await browser.newContext();
//
//   const page: Page = await context.newPage();
//   await page.goto("http://localhost:3000/en/login");
//
//   await page.getByRole("button", { name: "image Google Login" }).click();
//
//   await page.waitForURL("http://localhost:3000");
//
//   await page.getByLabel("Email or phone").fill("ghks123285@gmail.com");
//
//   await expect(
//     page.getByRole("button", { name: "image Google Login" })
//   ).toBeVisible();
//
//   await page.context().storageState({ path: "./LoginAuth.json" });
// }
export {};
