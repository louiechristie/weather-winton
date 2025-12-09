import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

test('has title', async ({ page }) => {
  console.log('baseUrl: ', baseUrl);
  await page.goto(baseUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/South London | Weather Winton/);
});

test('doesn\'t say "Probably Raining"', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page.getByText('Probably Raining')).toBeVisible({
    visible: false,
  });
});

test('doesn\'t have "Yesterday"', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page.getByText('Yesterday')).toBeVisible({
    visible: false,
  });
});

test.describe('fun dates', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl + '/fun');
  });

  test('pancake day', async ({ page }) => {
    await expect(page.getByText('Pancake Day 🥞')).toBeVisible();
  });

  test('Easter Monday', async ({ page }) => {
    await expect
      .poll(() => page.getByText('Easter Monday').count())
      .toBeGreaterThan(0);
  });

  test('April fools day 🤹', async ({ page }) => {
    await expect
      .poll(() => page.getByText('April fools day 🤹').count())
      .toBeGreaterThan(0);
  });

  test("Mother's day", async ({ page }) => {
    await expect
      .poll(() => page.getByText("Mother's day").count())
      .toBeGreaterThan(0);
  });
});

test.describe('named storm', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl + '/test/storm/');
  });

  test('storm Bram', async ({ page }) => {
    await expect(page.getByText('Storm Bram')).toBeVisible();
  });
});
