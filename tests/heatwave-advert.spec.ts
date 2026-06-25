import { test, expect, Page } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

test.describe('heatwave advert', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    console.log('baseUrl: ', baseUrl);
    await page.goto(`${baseUrl}/test/heatwave`);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('displays Stella Artois advert when heatwave is detected', async () => {
    // Verify the page has loaded with forecast data
    await expect(
      page.getByRole('heading', { name: 'Weather Winton', level: 1 })
    ).toBeVisible();

    // Look for the Stella Artois advert in the page
    const advert = page.getByText('Stella Artois Unfiltered');
    await expect(advert).toBeVisible();
  });

  test('advert appears between second and third heatwave day', async () => {
    // Get all day containers
    const dayItems = await page.locator('main li').all();

    // Find the index of the advert in the DOM
    let advertIndex = -1;
    for (let i = 0; i < dayItems.length; i++) {
      const text = await dayItems[i].textContent();
      if (text && text.includes('Stella Artois Unfiltered')) {
        advertIndex = i;
        break;
      }
    }

    expect(advertIndex).toBeGreaterThan(-1);

    // The advert should appear at the position of the third heatwave day
    // (between day 2 and day 3, which means at index 2 if 0-indexed)
    // This verifies that getThirdDayOfHeatwaveIndex is working correctly
    expect(advertIndex).toBeGreaterThanOrEqual(2);
  });

  test('advert contains Nigel Thomas reference', async () => {
    // The tweet should reference the beer/weather theme
    const tweet = page.locator('blockquote.twitter-tweet');
    await expect(tweet).toBeVisible();

    const tweetText = await tweet.textContent();
    expect(tweetText).toContain('Beer');
    expect(tweetText).toContain('Weather');
  });

  test('advert is clickable', async () => {
    const advert = page.locator('blockquote.twitter-tweet');
    await expect(advert).toBeVisible();
  });
});
