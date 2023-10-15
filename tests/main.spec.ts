import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/en/1");
});

test("사용자는 홈에서 상품을 클릭할 수 있다.", async ({ page, request }) => {
  await test.step("사용자는 홈에서 상품을 클릭할 수 있다.", async () => {
    await page.getByTestId("link").nth(1).dblclick();

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
  request,
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

  await test.step("페이지 옵션에서 Price 선택", async () => {
    await page.getByTestId("column").click();

    await page.waitForTimeout(2000);
    await selector.selectOption("price");

    const pathname = await page.evaluate(() => window.location.pathname);

    const fetchData = await request.get(
      `https://api.chec.io/v1/products?limit=5&page=${
        pathname.split("/")[2]
      }&sortBy=${option1[0]}`,
      {
        timeout: 5000,
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );

    const { data } = await fetchData.json();
    expect(fetchData.ok()).toBeTruthy();

    console.log(data);

    await page.waitForTimeout(1000);

    // expect(data[0]?.price?.raw).toEqual(22);

    expect(data[0].price.raw).toEqual(22);
    expect(data[0].name).toEqual("T-shirt123");

    expect(data[1].price.raw).toEqual(1243);
    expect(data[1].name).toEqual("T-shirt-2");

    expect(data[2].price.raw).toEqual(2222);
    expect(data[2].name).toEqual("Cat");

    expect(data[3].price.raw).toEqual(2235);
    expect(data[3].name).toEqual("T-shirt");

    expect(data[4].price.raw).toEqual(3000);
    expect(data[4].name).toEqual("T-shirt-5");

    await expect(page).toHaveURL("http://localhost:3000/en/1?sortBy=price");
  });

  await page.waitForTimeout(1500);

  await test.step("페이지 옵션에서 Name 선택", async () => {
    await page.getByTestId("column").click();

    await page.waitForTimeout(2000);
    await selector.selectOption("name");

    const pathname = await page.evaluate(() => window.location.pathname);

    const fetchData = await request.get(
      `https://api.chec.io/v1/products?limit=5&page=${
        pathname.split("/")[2]
      }&sortBy=${option2[0]}`,
      {
        timeout: 5000,
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );

    const { data } = await fetchData.json();
    expect(fetchData.ok()).toBeTruthy();

    await page.waitForTimeout(1000);

    expect(data[0].price.raw).toEqual(2222);
    expect(data[0].name).toEqual("Cat");

    expect(data[1].price.raw).toEqual(8888);
    expect(data[1].name).toEqual("Cat2");

    expect(data[2].price.raw).toEqual(5555);
    expect(data[2].name).toEqual("Cat3");

    expect(data[3].price.raw).toEqual(8888);
    expect(data[3].name).toEqual("Cat4");

    expect(data[4].price.raw).toEqual(5555);
    expect(data[4].name).toEqual("Cat6");

    await expect(page).toHaveURL("http://localhost:3000/en/1?sortBy=name");
  });

  await page.waitForTimeout(1500);

  await test.step("페이지 옵션에서 Updated 선택", async () => {
    await page.getByTestId("column").click();

    await page.waitForTimeout(2000);
    await selector.selectOption("updated_at");

    const pathname = await page.evaluate(() => window.location.pathname);

    const fetchData = await request.get(
      `https://api.chec.io/v1/products?limit=5&page=${
        pathname.split("/")[2]
      }&sortBy=${option3[0]}`,
      {
        timeout: 5000,
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );

    const { data } = await fetchData.json();
    expect(fetchData.ok()).toBeTruthy();

    await page.waitForTimeout(1000);

    expect(data[0].price.raw).toEqual(3333);
    expect(data[0].name).toEqual("T-shirt-3");

    expect(data[1].price.raw).toEqual(4000);
    expect(data[1].name).toEqual("T-shirt");

    expect(data[2].price.raw).toEqual(6666);
    expect(data[2].name).toEqual("T-shirt");

    expect(data[3].price.raw).toEqual(3333);
    expect(data[3].name).toEqual("T-shirt");

    expect(data[4].price.raw).toEqual(1243);
    expect(data[4].name).toEqual("T-shirt-2");

    await expect(page).toHaveURL(
      "http://localhost:3000/en/1?sortBy=updated_at"
    );
  });
});
