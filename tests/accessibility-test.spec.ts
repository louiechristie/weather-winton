import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto(baseUrl);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    const numberOfAccessiblityIssues =
      accessibilityScanResults.violations.length;

    if (numberOfAccessiblityIssues > 0) {
      console.warn(
        'Number of accessibility issues: ',
        numberOfAccessiblityIssues
      );

      accessibilityScanResults.violations.forEach((violation) => {
        console.warn(violation.description, ': ', violation.nodes.length);
      });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
