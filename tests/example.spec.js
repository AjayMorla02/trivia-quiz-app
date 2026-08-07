// @ts-check
import { test, expect } from '@playwright/test';

test('quiz page', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500');

  // Expect a title "to contain" a substring.
  await expect(page.locator('#question')).toHaveText('What is 2 + 2?');
});

test('user can select an answer', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500');

  // Click the get started link.
  await page.locator('#option2').click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.locator('#result')).toHaveText('You selected: 4');
});

test('correct answer is shown', async({ page }) => {
    await page.goto('http://127.0.0.1:5500');

    // Click the get started link.
    await page.locator('#option2').click();

    await page.locator('.submit-btn').click();
    
    // Expects page to have a heading with the name of Installation.
    await expect(page.locator('#result')).toHaveText('Correct!');
});