import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/en/1");
});

test("사용자는 홈에서 상품을 클릭할 수 있다.", async ({ page, request }) => {
  await test.step("홈 모든 상품", async () => {
    await expect(
      page.getByRole("link").filter({ has: page.getByText("T-shirt1") })
    ).toHaveCount(3);

    await expect(
      page.getByRole("link").filter({ has: page.getByText("T-shirt3") })
    ).toHaveCount(1);

    await expect(
      page.getByRole("link").filter({ has: page.getByText("Cat") })
    ).toHaveCount(2);
  });
  await test.step("사용자는 홈에서 상품을 클릭할 수 있다.", async () => {
    await page.locator(".product_imageWrapper__ga6oW").nth(1).click();

    const id = "prod_DWy4oGEG3ql6Jx";

    const fetchData = await request.get(
      `https://api.chec.io/v1/products/${id}`,
      {
        timeout: 5000,
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );
    expect(fetchData.ok()).toBeTruthy();

    await page.waitForTimeout(2000);

    const {
      categories,
      price: { raw },
      variant_groups,
    } = await fetchData.json();

    expect(categories[0]).toEqual({
      id: "cat_QG375vgGplrMOg",
      name: "T-shirt",
      slug: "t-shirt",
    });

    expect(raw).toEqual(6666);
    expect(variant_groups[0].name).toEqual("Color");
    expect(variant_groups[1].name).toEqual("Size");

    const title = page.getByTestId("detail-title");

    console.log(title);
    await expect(title).toHaveClass("product_productTitle__R178h");
  });
});

test("사용자는 홈에서 번호를 선택할 수 있다.", async ({ page, request }) => {
  // await page.getByTestId("product_paginationContainer__kyr2u").click();

  await test.step("페이지 번호 2 선택.", async () => {
    await page.getByRole("listitem").filter({ hasText: "2" }).click();

    const mockPage = 2;
    const fetchData = await request.get(
      `https://api.chec.io/v1/products?limit=5&page=${mockPage}`,
      {
        timeout: 5000,
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );

    expect(fetchData.ok()).toBeTruthy();

    await expect(page).toHaveURL("http://localhost:3000/en/2");
  });

  await test.step("페이지 번호 3 선택.", async () => {
    await page.getByRole("listitem").filter({ hasText: "3" }).click();

    const mockPage = 2;
    const fetchData = await request.get(
      `https://api.chec.io/v1/products?limit=5&page=${mockPage}`,
      {
        timeout: 5000,
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );

    expect(fetchData.ok()).toBeTruthy();
    await expect(page).toHaveURL("http://localhost:3000/en/3");
  });
});

test("사용자는 홈에서 옵션을 선택할 수 있다. (Name, updated , Price)", async ({
  page,
}) => {
  const selector = await page.getByTestId("column");

  const option1 = await selector.selectOption("price");
  const option2 = await selector.selectOption("name");
  const option3 = await selector.selectOption("updated_at");

  await test.step("페이지 옵션", async () => {
    expect(option1[0]).toBe("price");
    expect(option2[0]).toBe("name");
    expect(option3[0]).toBe("updated_at");
  });

  // await test.step("페이지 옵션에서 price 선택", async () => {});
});
