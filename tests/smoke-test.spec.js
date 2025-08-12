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

test('doesn\'t have "Yesterday"', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'http://127.0.0.1:8000');

  await expect(page.getByText('Yesterday')).toBeVisible({
    visible: false,
  });
});

test.describe('fun dates', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      process.env.BASE_URL
        ? process.env.BASE_URL + '/fun'
        : 'http://127.0.0.1:8000' + '/fun'
    );
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
    await page.goto(
      process.env.BASE_URL
        ? process.env.BASE_URL + '/test/storm/'
        : 'http://127.0.0.1:8000' + '/test/storm/'
    );
  });

  test('storm Floris', async ({ page }) => {
    await expect(page.getByText('storm Floris')).toBeVisible();
  });
});
