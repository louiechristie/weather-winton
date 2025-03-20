// eslint-disable-next-line node/no-unpublished-import
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
   
  console.log('BASE_URL: ', process.env.BASE_URL);
  await page.goto(process.env.BASE_URL || 'http://127.0.0.1:8000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/South London | Weather Winton/);
});

test('doesn\'t say "Probably Raining"', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'http://127.0.0.1:8000');

  await expect(page.getByText('Probably Raining')).toBeVisible({
    visible: false,
  });
});
