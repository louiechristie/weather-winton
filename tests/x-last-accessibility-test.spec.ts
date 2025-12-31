import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AxeResults } from 'axe-core';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const stubs = ['/', '/test/', '/fun/', '/storm/', '/test/windy/', '/error/'];

/* Workaround for flakey test in dev with Next.js message "Latest available version is detected (16.1.1).\">Next.js 16.1.1</span>" */
if (process.env.NODE_ENV === 'production') stubs.push('/test/heatwave/');

test.describe('Accessibility', () => {
  let totalNumberOfAccessiblityIssues = 0;

  type Violations = AxeResults['violations']; // the array type
  type Violation = Violations[number]; // a single violation item

  interface HashMap<T> {
    [key: string]: T;
  }

  type AccessibilityIssue = Violation & {
    count: number;
  };

  // init the map
  const accessibilityIssueMap: HashMap<AccessibilityIssue> = {};

  stubs.forEach((stub) => {
    test(`${stub} should not have any automatically detectable accessibility issues`, async ({
      page,
    }) => {
      await page.goto(`${baseUrl}${stub}`);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      const violations = accessibilityScanResults.violations;
      const numberOfAccessiblityIssues = violations.length;

      totalNumberOfAccessiblityIssues =
        totalNumberOfAccessiblityIssues + numberOfAccessiblityIssues;

      if (numberOfAccessiblityIssues > 0) {
        violations.forEach((violation) => {
          accessibilityIssueMap[violation.id] = {
            ...violation,
            count: accessibilityIssueMap[violation.id]?.count + 1,
          };
          console.warn(violation.description, ': ', violation.nodes.length);
        });
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  if (totalNumberOfAccessiblityIssues > 0) {
    Object.values(accessibilityIssueMap).forEach((issue) => {
      console.warn(issue.description, ': ', issue.count);
    });
  }

  expect(totalNumberOfAccessiblityIssues).toEqual(0);
  expect(accessibilityIssueMap).toEqual({});
});
