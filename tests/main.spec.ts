import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/en/1');
});

test('사용자는 홈에서 상품을 클릭할 수 있다.', async ({ page }) => {
  await page.goto('');
});
