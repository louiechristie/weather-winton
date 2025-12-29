import { test, expect, Page } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

test.describe('main page', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    console.log('baseUrl: ', baseUrl);
    await page.goto(baseUrl);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('has title', async () => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/South London | Weather Winton/);
  });

  test('doesn\'t say "Probably Raining"', async () => {
    await expect(page.getByText('Probably Raining')).toBeVisible({
      visible: false,
    });
  });

  test('doesn\'t have "Yesterday"', async () => {
    await expect(page.getByText('Yesterday')).toBeVisible({
      visible: false,
    });
  });
});

test.describe('fun dates', async () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(baseUrl + '/fun/');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('pancake day', async () => {
    await expect(page.getByText('Pancake Day 🥞')).toBeVisible();
  });

  test('Easter Monday', async () => {
    await expect
      .poll(() => page.getByText('Easter Monday').count())
      .toBeGreaterThan(0);
  });

  test('April fools day 🤹', async () => {
    await expect
      .poll(() => page.getByText('April fools day 🤹').count())
      .toBeGreaterThan(0);
  });

  test("Mother's day", async () => {
    await expect
      .poll(() => page.getByText("Mother's day").count())
      .toBeGreaterThan(0);
  });
});

test.describe('named storm', async () => {
  test('storm Bram', async ({ page }) => {
    await page.goto(baseUrl + '/storm/');
    await expect(page.getByText('Storm Bram')).toHaveCount(2);
    await expect(page.getByText('heatwave')).toHaveCount(0);
    await expect(page.getByText('Windy').first()).toBeVisible();
  });
});

test.describe('weather conditions', async () => {
  test('windy', async ({ page }) => {
    await page.goto(baseUrl + '/test/windy/');
    await expect(page.getByText('Windy')).toBeVisible();
    await expect(page.getByText('heatwave')).toHaveCount(0);
    await expect(page.getByText('Storm Bram')).toHaveCount(0);
  });

  test('heatwave', async ({ page }) => {
    await page.goto(baseUrl + '/test/heatwave/');
    await expect(page.getByText('heatwave')).toBeVisible();
    await expect(page.getByText('Enjoy Beer')).toBeVisible();
    await expect(page.getByText('Windy')).toHaveCount(0);
    await expect(page.getByText('Storm Bram')).toHaveCount(0);
  });
});
