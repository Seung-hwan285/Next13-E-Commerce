import { expect, test } from "@playwright/test";
import { setCookieVals } from "./navbar.spec";

const urlId = "prod_DWy4oGEG3ql6Jx";

test.beforeEach(async ({ page, browser }) => {
  await page.goto("http://localhost:3000/en/1");

  const context = await browser.newContext();
  const cookieValue = await setCookieVals();

  await context.addCookies(cookieValue);
});

test("사용자는 홈에서 상품을 클릭한다.", async ({ page, request }) => {
  // await page.locator(".product_imageWrapper__ga6oW").nth(1).click();

  await page.getByTestId("link").nth(1).dblclick();

  const fetchData = await request.get(
    `https://api.chec.io/v1/products/${urlId}`,
    {
      timeout: 5000,
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
      },
    }
  );

  expect(fetchData.ok()).toBeTruthy();
  const data = await fetchData.json();
  // await page.goto(`http://localhost:3000/en/product/${data.id}`);

  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(`http://localhost:3000/en/product/${data.id}`);
});

test("사용자는 페이지에서 옵션을 선택한다. (사이즈)", async ({
  page,
  request,
}) => {
  await page.goto(`http://localhost:3000/en/product/${urlId}`);
  await page.waitForTimeout(1500);

  await page.locator(".product_productOption__iXpif div button").nth(1).click();

  const size = await page
    .locator(".product_productOption__iXpif div button")
    .nth(1)
    .textContent();

  await page.waitForTimeout(1500);

  await expect(page).toHaveURL(
    `http://localhost:3000/en/product/${urlId}?Size=${size}`
  );
});

test("사용자는 페이지에서 옵션을 선택한다. (색상)", async ({
  page,
  request,
}) => {
  await page.goto(`http://localhost:3000/en/product/${urlId}`);
  await page.waitForTimeout(1500);

  await page
    .locator(".product_productOptionItem__ZKIs7  button")
    .nth(2)
    .click();

  const color = "GREEN";

  await page.waitForTimeout(1500);

  await expect(page).toHaveURL(
    `http://localhost:3000/en/product/${urlId}?Color=${color}`
  );
});

test("사용자는 추가하기 버튼을 누른다.", async ({ page, request, browser }) => {
  await page.goto(`http://localhost:3000/en/product/${urlId}`);

  await page.waitForTimeout(1000);
  await page
    .getByTestId("add-cart")
    .filter({ hasText: "Add to cart" })
    .dblclick();

  await page.waitForTimeout(1000);

  // const cookies = "cart_gvRjwOdZLAo4mN";
  const cookies = await page.context().cookies();

  const fetchData = await request.post(
    `https://api.chec.io/v1/carts/${cookies[2]?.value}`,
    {
      timeout: 5000,
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
      },

      data: {
        id: urlId,
        quality: 1,
      },
    }
  );

  const data = await fetchData.json();

  // eslint-disable-next-line prefer-const
  const { line_items, id } = data;

  expect(fetchData.ok()).toBeTruthy();

  await page.waitForTimeout(1000);

  // expect(line_items[0].name).toEqual("T-shirt");

  const cartId = id.split("_")[0];
  expect(cartId).toEqual("cart");
});
