import { test, expect } from '@playwright/test';

let apicontext;

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/en/1');
});

// test.beforeAll(async ({ playwright }) => {
//   apicontext = await playwright.request.newContext({
//     baseURL: process.env.NEXT_PUBLIC_URL,
//     extraHTTPHeaders: {
//       Accept: 'application/json',
//       'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
//     },
//   });
// });
// 이름 나중에 바꾸기

// eslint-disable-next-line no-empty-pattern
// test.afterAll(async ({}) => {
//   await apicontext.dispose();
// });

test('초기 렌더링 title 테스트', async ({ page }) => {
  await page.goto('http://localhost:3000/en/1');

  const pathname = await page.evaluate(() => window.location.pathname);
  console.log(pathname);
  await expect(page).toHaveTitle('Shop');
});

test('사용자는 navbar를 클릭하고 login 페이지로 이동한다.', async ({
  page,
}) => {
  await page.getByTestId('navbar-ham').click();

  await page.getByTestId('login').click();
  await page.goto('http://localhost:3000/en/login');

  await expect(page).toHaveURL('http://localhost:3000/en/login');
});

test('사용자는 navbar를 클릭하고 cart 페이지로 이동한다.', async ({
  page,
  request,
  browser,
}) => {
  await page.getByTestId('directions').click();
  await page.getByTestId('cart').click();

  const context = await browser.newContext();
  const cookieValue = await setCookieVals();
  context.addCookies(cookieValue);
  await page.waitForTimeout(1000);

  await page.goto('http://localhost:3000/en/cart');

  const cookies = await page.context().cookies();

  const fetchData = await request.get(
    `https://api.chec.io/v1/carts/${cookies[2].value}`,
    {
      timeout: 5000,
      headers: {
        'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
      },
    }
  );
  expect(fetchData.ok()).toBeTruthy();
});

test('사용자는 navbar를 클릭하고 home 페이지로 이동한다.', async ({ page }) => {
  await page.getByTestId('navbar-ham').click();

  await page.getByTestId('home').click();
  await page.goto('http://localhost:3000/en/1');

  await expect(page).toHaveURL('http://localhost:3000/en/1');
});

test('사용자는 navbar를 클릭하고 collection을 선택할 수 있다. (Cat) ', async ({
  page,
  request,
}) => {
  await page.getByTestId('navbar-ham').click();
  await page.getByTestId('collection').click();

  const fetchData = await request.get(`https://api.chec.io/v1/categories`, {
    timeout: 5000,
    headers: {
      'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
    },
  });

  expect(fetchData.ok()).toBeTruthy();
  await page.waitForTimeout(2000);

  await page.getByTestId('li').filter({ hasText: 'Cat' }).click();
  await expect(page).toHaveURL('http://localhost:3000/en/search/Cat');

  // footer에 적용하기
  const t = await page.getByRole('listitem').filter({ hasText: 'T-shirt' });
});

test('사용자는 navbar를 클릭하고 collection을 선택할 수 있다. (Collection)', async ({
  page,
  request,
}) => {
  await page.getByTestId('navbar-ham').click();
  await page.getByTestId('collection').click();

  const fetchData = await request.get(`https://api.chec.io/v1/categories`, {
    timeout: 5000,
    headers: {
      'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
    },
  });

  expect(fetchData.ok()).toBeTruthy();
  await page.waitForTimeout(2000);

  await page.getByTestId('li').filter({ hasText: 'T-shirt' }).click();

  await expect(page).toHaveURL('http://localhost:3000/en/search/T-shirt');
});

export async function setCookieVals() {
  const cookies = [
    {
      name: 'cartId',
      value: 'cart_QG375vWpjRlrMO',
      path: '/',
      domain: 'localhost',
    },
  ];

  return cookies;
}

// test('사용자는 ')

// test('사용자')

//
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
