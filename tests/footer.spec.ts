import { expect, test } from "@playwright/test";
import { setCookieVals } from "./navbar.spec";

test.beforeEach(async ({ page, browser }) => {
  await page.goto("http://localhost:3000/en/1");

  const context = await browser.newContext();
  const cookieValue = await setCookieVals();

  await context.addCookies(cookieValue);
});

test("사용자는 About에서 home 링크를 선택한다.", async ({ page }) => {
  await page.getByRole("listitem").filter({ hasText: "Home" }).dblclick();

  await page.waitForTimeout(500);
  await expect(page).toHaveURL("http://localhost:3000/en/1");
});

test("사용자는 About에서 Cat 링크를 선택한다. ", async ({ page }) => {
  await page.getByRole("listitem").filter({ hasText: "Cat" }).dblclick();

  await page.waitForTimeout(500);
  await expect(page).toHaveURL("http://localhost:3000/en/search/Cat");
});

test("사용자는 About에서 T-shirt 링크를  선택한다. ", async ({ page }) => {
  await page.getByRole("listitem").filter({ hasText: "T-shirt" }).dblclick();

  await page.waitForTimeout(500);
  await expect(page).toHaveURL("http://localhost:3000/en/search/T-shirt");
});

test("사용자는 About에서 Cart 링크를 선택한다. ", async ({ page, request }) => {
  await page.getByRole("listitem").filter({ hasText: "Cart" }).dblclick();

  await page.waitForTimeout(500);

  const cookies = await page.context().cookies();

  const fetchData = await request.get(
    `${process.env.NEXT_PUBLIC_URL}/v1/carts/${cookies[2]?.value}`,
    {
      timeout: 5000,

      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
      },
    }
  );
  expect(fetchData.ok()).toBeTruthy();
  await expect(page).toHaveURL("http://localhost:3000/en/cart");
});

test("사용자는 Home에서 다국어를 선택할 수 있다. (kr)", async ({ page }) => {
  await page.waitForTimeout(1500);

  await page.locator(".page_footerBottom__OpzjE ul li a").nth(0).dblclick();

  await page.waitForTimeout(500);

  await expect(page).toHaveURL("http://localhost:3000/kr/1");

  await test.step("사용자는 다국어를 선택하고 About에서 cat 링크를 선택한다.", async () => {
    await page.getByRole("listitem").filter({ hasText: "Cat" }).dblclick();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL("http://localhost:3000/kr/search/Cat");
  });

  await page.waitForTimeout(1000);

  await test.step("사용자는 다국어를 선택하고 About에서 T-shirt 링크를 선택한다.", async () => {
    await page.getByRole("listitem").filter({ hasText: "T-shirt" }).dblclick();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL("http://localhost:3000/kr/search/T-shirt");
  });
});

test("사용자는 Home에서 다국어를 선택할 수 있다. (en)", async ({
  page,
  request,
}) => {
  await page.waitForTimeout(1500);

  await page.locator(".page_footerBottom__OpzjE ul li a").nth(1).dblclick();

  await page.waitForTimeout(500);

  await expect(page).toHaveURL("http://localhost:3000/en/1");

  await test.step("사용자는 다국어를 선택하고 About에서 cat 링크를 선택한다.", async () => {
    await page.getByRole("listitem").filter({ hasText: "Cat" }).dblclick();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL("http://localhost:3000/en/search/Cat");
  });

  await page.waitForTimeout(3000);

  await test.step("사용자는 다국어를 선택하고 About에서 T-shirt 링크를 선택한다.", async () => {
    await page.getByRole("listitem").filter({ hasText: "T-shirt" }).dblclick();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL("http://localhost:3000/en/search/T-shirt");
  });
});
