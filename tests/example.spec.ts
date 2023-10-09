import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/en/1');
  // const pathname = await page.evaluate(() => window.location.pathname);
  // console.log(pathname);
});
// 이름 나중에 바꾸기

test('초기 렌더링 title 테스트', async ({ page }) => {
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

test('사용자는 navbar를 클릭하고 cart 페이지로 이동한다.', async ({ page }) => {
  await page.getByTestId('navbar-ham').click();

  await page.getByTestId('cart').click();
  await page.goto('http://localhost:3000/en/cart');

  await expect(page).toHaveURL('http://localhost:3000/en/cart');
});

test('사용자는 navbar를 클릭하고 home 페이지로 이동한다.', async ({ page }) => {
  await page.getByTestId('navbar-ham').click();

  await page.getByTestId('home').click();
  await page.goto('http://localhost:3000/en/1');

  await expect(page).toHaveURL('http://localhost:3000/en/1');
});

test('사용자는 navbar를 클릭하고 collection을 선택할 수 있다. ', async ({
  page,
}) => {
  await page.getByTestId('navbar-ham').click();
  await page.getByTestId('collection').click();
});

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
