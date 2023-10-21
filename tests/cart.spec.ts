import { expect, test } from "@playwright/test";

const urlId = "prod_DWy4oGEG3ql6Jx";

test.beforeEach(async ({ page, browser }) => {
  await page.goto("http://localhost:3000/en/1");

  const context = await browser.newContext();
  const cookieValue = await setCookieVals();

  await context.addCookies(cookieValue);
});

test("사용자는 cart에서 상품을 추가할 수 있다.", async ({ page, request }) => {
  test.setTimeout(0);
  await page.goto(`http://localhost:3000/en/product/${urlId}`);

  // await page.waitForTimeout(2000);

  await page
    .getByTestId("add-cart")
    .filter({ hasText: "Add to cart" })
    .dblclick();

  await page.waitForTimeout(2000);
  await page.goto("http://localhost:3000/en/cart");

  const value = await page.getByTestId("cart-count").textContent();
  console.log(value);

  const cookies = await page.context().cookies();

  const data = await request.post(
    `https://api.chec.io/v1/carts/${cookies[2]?.value}`,
    {
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
      },

      data: {
        id: urlId,
        quality: 1,
      },
    }
  );

  const res = await data.json();
  console.log(res);

  await page.waitForTimeout(500);
  await page.getByAltText("image2").dblclick();

  await expect(page.getByTestId("cart-count")).toBeVisible();

  expect(res.line_items[0].product_name).toBe("T-shirt");
  expect(res.line_items[0].name).toBe("T-shirt");
  expect(res.total_items).toBe(3);
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

//-------------------------//

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
