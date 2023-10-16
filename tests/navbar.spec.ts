import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/en/1");
});

test("초기 렌더링 title 테스트", async ({ page }) => {
  await page.goto("http://localhost:3000/en/1");

  const pathname = await page.evaluate(() => window.location.pathname);
  await expect(page).toHaveTitle("Shop");
});

test("사용자는 navbar를 클릭하고 login 페이지로 이동한다.", async ({
  page,
}) => {
  await page.getByTestId("navbar-ham").click();

  await page.getByTestId("login").click();
  await page.goto("http://localhost:3000/en/login");

  await expect(page).toHaveURL("http://localhost:3000/en/login");
});

test("사용자는 navbar를 클릭하고 cart 페이지로 이동한다.", async ({
  page,
  request,
  browser,
}) => {
  await page.getByTestId("directions").click();
  await page.getByTestId("cart").click();

  const context = await browser.newContext();
  const cookieValue = await setCookieVals();
  await context.addCookies(cookieValue);

  await page.waitForTimeout(1000);
  const cookies = await page.context().cookies();

  await page.goto("http://localhost:3000/en/cart");

  const fetchData = await request.get(
    `https://api.chec.io/v1/carts/${cookies[2]?.value}`,
    {
      timeout: 5000,
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
      },
    }
  );
  expect(fetchData.ok()).toBeTruthy();
});

test("사용자는 navbar를 클릭하고 home 페이지로 이동한다.", async ({ page }) => {
  await page.getByTestId("navbar-ham").click();

  await page.getByTestId("home").click();
  await page.goto("http://localhost:3000/en/1");

  await expect(page).toHaveURL("http://localhost:3000/en/1");
});

test("사용자는 navbar를 클릭하고 collection을 선택할 수 있다. (Cat) ", async ({
  page,
  request,
}) => {
  await page.getByTestId("navbar-ham").click();
  await page.getByTestId("collection").click();

  const fetchData = await request.get(`https://api.chec.io/v1/categories`, {
    headers: {
      "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
    },
  });

  expect(fetchData.ok()).toBeTruthy();
  await page.waitForTimeout(2000);

  await page.getByTestId("li").filter({ hasText: "Cat" }).click();

  await expect(page).toHaveURL("http://localhost:3000/en/search/Cat");
  // footer에 적용하기
  // const t = await page.getByRole('listitem').filter({ hasText: 'T-shirt' });
});

test("사용자는 navbar를 클릭하고 collection을 선택할 수 있다. (T-shirt)", async ({
  page,
  request,
}) => {
  await page.getByTestId("navbar-ham").click();
  await page.getByTestId("collection").click();

  const fetchData = await request.get(`https://api.chec.io/v1/categories`, {
    headers: {
      "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
    },
  });

  expect(fetchData.ok()).toBeTruthy();
  await page.waitForTimeout(2000);

  await page.getByTestId("li").filter({ hasText: "T-shirt" }).click();
  await expect(page).toHaveURL("http://localhost:3000/en/search/T-shirt");
});

test("사용자는 navbar에서 검색을 할 수 있다.", async ({ page, request }) => {
  await page.getByTestId("search-bar").fill("Cat");

  // 1. 사용자 검색
  await test.step("사용자는 검색할 수 있다.", async () => {
    await page.getByTestId("search-bar").click();

    const value = await page.evaluate((input) => input, "Cat");

    const fetchData = await request.get(
      `https://api.chec.io/v1/products?query=${value}`,
      {
        timeout: 5000,
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );
    expect(fetchData.ok()).toBeTruthy();
    await expect(page.getByRole("link", { name: "Cat3" })).toBeVisible();
  });

  // 2. 검색한 값 클릭
  await test.step("사용자는 검색한 값을 클릭한다.", async () => {
    await page.getByRole("link", { name: "Cat3" }).click();
    await page.goto("http://localhost:3000/en/search/Cat3");

    await expect(page).toHaveURL("http://localhost:3000/en/search/Cat3");
  });
});

test("사용지는 dark mode를 선택할 수 있다.", async ({ page }) => {
  await page.getByRole("button", { name: "🌙" }).click();
  await page.getByRole("button", { name: "☀" }).click();
});

//----------------------------- utils ----------------------- //
export async function setCookieVals() {
  return [
    {
      name: "cartId",
      value: "cart_QG375vWpjRlrMO",
      path: "/",
      domain: "localhost",
    },
  ];
}
