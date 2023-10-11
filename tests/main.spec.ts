import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/en/1');
});

test('사용자는 홈에서 상품을 클릭할 수 있다.', async ({ page, request }) => {
  const shirt1 = await page.getByRole('link').allTextContents();

  console.log(shirt1[3].slice(0, 8));

  await test.step('홈 모든 상품', async () => {
    await expect(
      page.getByRole('link').filter({ has: page.getByText('T-shirt1') })
    ).toHaveCount(3);

    await expect(
      page.getByRole('link').filter({ has: page.getByText('T-shirt3') })
    ).toHaveCount(1);

    await expect(
      page.getByRole('link').filter({ has: page.getByText('Cat') })
    ).toHaveCount(2);
  });

  await test.step('사용자는 홈에서 상품을 클릭할 수 있다.', async () => {
    await page.locator('.product_imageWrapper__ga6oW').nth(1).click();

    const id = 'prod_DWy4oGEG3ql6Jx';

    const fetchData = await request.get(
      `https://api.chec.io/v1/products/${id}`,
      {
        timeout: 5000,
        headers: {
          'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
        },
      }
    );
    expect(fetchData.ok()).toBeTruthy();

    await page.waitForTimeout(2000);
    const title = page.getByTestId('detail-title');

    await expect(title).toHaveText('T-shirt1');
    await expect(title).toHaveClass('product_productTitle__R178h');
  });

  // await test.step('사용자는 1개를 골라서 선택할 수 있다.', async ({request}) => {
  //   await page.locator('.product_imageWrapper__ga6oW').nth(1).click();
  //
  //
  //   const fetchData = await request.get(
  //       `https://api.chec.io/v1/products`,
  //       {
  //         timeout: 5000,
  //         headers: {
  //           'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
  //         },
  //       }
  //   );
  //
  //   expect(fetchData.ok()).toBeTruthy();
  // });

  // const productItmes =  page.getByTestId('link');
  // console.log(productItmes);

  // await page.getByRole('link').filter({has : page.getByRole()})
});
