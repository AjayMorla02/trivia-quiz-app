// @ts-check
import { test, expect } from '@playwright/test';

test('quiz page question available', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500');

  // Expect a title "to contain" a substring.
  await expect(page.locator('#question')).not.toBeEmpty();
});

test('options available', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500');

  // Click the get started link.
  await expect(page.locator('#option1')).not.toBeEmpty();
  await expect(page.locator('#option2')).not.toBeEmpty();
  await expect(page.locator('#option3')).not.toBeEmpty();
  await expect(page.locator('#option4')).not.toBeEmpty();
});

test('answer selected', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500');

  await page.locator('#option1').click();

  await expect(page.locator('#result')).toContainText('You selected:');
});
