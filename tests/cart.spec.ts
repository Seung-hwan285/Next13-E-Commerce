import { expect, test } from "@playwright/test";
import { setCookieVals } from "./navbar.spec";

const urlId = "prod_DWy4oGEG3ql6Jx";

test.beforeEach(async ({ page, browser }) => {
  await page.goto("http://localhost:3000/en/1");

  const context = await browser.newContext();
  const cookieValue = await setCookieVals();

  await context.addCookies(cookieValue);
});

// test("사용자는 detail에서 상품을 추가한다.", async ({
//   page,
//   request,
//   browser,
// }) => {
//   await page.goto(`http://localhost:3000/en/product/${urlId}`);
//
//   await page.waitForTimeout(1000);
//   await page
//     .getByTestId("add-cart")
//     .filter({ hasText: "Add to cart" })
//     .dblclick();
//
//   await page.waitForTimeout(1000);
//
//   // const cookies = "cart_gvRjwOdZLAo4mN";
//   const cookies = await page.context().cookies();
//
//   const fetchData = await request.post(
//     `https://api.chec.io/v1/carts/${cookies[2]?.value}`,
//     {
//       timeout: 5000,
//       headers: {
//         "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
//       },
//
//       data: {
//         id: urlId,
//         quality: 1,
//       },
//     }
//   );
//
//   const data = await fetchData.json();
//
//   console.log(data);
//   // eslint-disable-next-line prefer-const
//   const { line_items, id } = data;
//
//   expect(fetchData.ok()).toBeTruthy();
//
//   await page.waitForTimeout(1000);
//
//   const cartId = id.split("_")[0];
//   expect(cartId).toEqual("cart");
// });

test("사용자는 cart에서 상품을 추가할 수 있다.", async ({ page, request }) => {
  test.setTimeout(0);
  await page.goto(`http://localhost:3000/en/product/${urlId}`);

  await page.waitForTimeout(1000);
  await page
    .getByTestId("add-cart")
    .filter({ hasText: "Add to cart" })
    .dblclick();

  const cookies = await page.context().cookies();
  await request.post(`https://api.chec.io/v1/carts/${cookies[2]?.value}`, {
    timeout: 5000,
    headers: {
      "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
    },

    data: {
      id: urlId,
      quality: 1,
    },
  });

  await page.goto("http://localhost:3000/en/cart");
  await page.waitForTimeout(1500);
  await page.getByAltText("image2").dblclick();

  const value = await page.getByTestId("cart-count").textContent();

  await expect(page.getByTestId("cart-count")).toBeVisible();
  console.log(value);
  expect(value).toEqual("4");
});

//
test("사용자는 cart에서 상품을 삭제할 수 있다.", async ({ page, request }) => {
  test.setTimeout(0);
  await page.goto(`http://localhost:3000/en/product/${urlId}`);

  await page.waitForTimeout(1000);
  await page
    .getByTestId("add-cart")
    .filter({ hasText: "Add to cart" })
    .dblclick();

  const cookies = await page.context().cookies();
  await request.post(`https://api.chec.io/v1/carts/${cookies[2]?.value}`, {
    timeout: 5000,
    headers: {
      "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
    },

    data: {
      id: urlId,
      quality: 1,
    },
  });
  await page.goto("http://localhost:3000/en/cart");
  await page.getByTestId("delete-image").dblclick();

  await page.waitForTimeout(5000);
  await page.reload();

  const total = await page.getByTestId("total").textContent();

  const splitTotal = total?.split(" ")[2].slice(1, 2);
  console.log(splitTotal);

  expect(splitTotal).toBe("0");
  // expect()
});
