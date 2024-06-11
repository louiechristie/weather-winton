import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://weather.louiechristie.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/South London | Weather Winton/);
});

test('doesn\'t say "Probably Raining"', async ({ page }) => {
  await page.goto('https://weather.louiechristie.com/');

  await expect(page.getByText('Probably Raining')).toBeVisible({
    visible: false,
  });
});
