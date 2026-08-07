
import { test, expect } from '@playwright/test';


test.describe('Quiz Application', () => {


    // --------------------------------
    // OPEN THE APPLICATION
    // --------------------------------

    test.beforeEach(async ({ page }) => {

        await page.goto('/');

        // Wait until the API question appears
        await expect(page.locator('#question'))
            .not.toHaveText('Loading questions...');

    });


    // --------------------------------
    // PAGE LOAD TEST
    // --------------------------------

    test('should display the quiz page', async ({ page }) => {

        await expect(page.locator('h1'))
            .toHaveText('Test Your Knowledge');

        await expect(page.locator('#question'))
            .not.toBeEmpty();

    });


    // --------------------------------
    // ANSWER OPTIONS
    // --------------------------------

    test('should display four answer options', async ({ page }) => {

        await expect(page.locator('#option1'))
            .not.toBeEmpty();

        await expect(page.locator('#option2'))
            .not.toBeEmpty();

        await expect(page.locator('#option3'))
            .not.toBeEmpty();

        await expect(page.locator('#option4'))
            .not.toBeEmpty();

    });


    // --------------------------------
    // SELECT ANSWER
    // --------------------------------

    test('should allow the user to select an answer', async ({ page }) => {

        await page.locator('#option1').click();

        await expect(page.locator('#result'))
            .toContainText('You selected:');

    });


    // --------------------------------
    // SUBMIT WITHOUT ANSWER
    // --------------------------------

    test('should prevent submission without an answer', async ({ page }) => {

        await page.locator('.submit-btn').click();

        await expect(page.locator('#result'))
            .toHaveText('Please select an answer.');

    });


    // --------------------------------
    // SUBMIT AN ANSWER
    // --------------------------------

    test('should show a result after submitting an answer', async ({ page }) => {

        await page.locator('#option1').click();

        await page.locator('.submit-btn').click();

        await expect(page.locator('#result'))
            .toHaveText(/Correct!|Incorrect!/);

    });


    // --------------------------------
    // NEXT QUESTION
    // --------------------------------

    test('should load the next question', async ({ page }) => {

        const firstQuestion =
            await page.locator('#question').textContent();

        await page.locator('.next-btn').click();

        const secondQuestion =
            await page.locator('#question').textContent();

        expect(secondQuestion)
            .not.toBe(firstQuestion);

    });


    // --------------------------------
    // COMPLETE QUIZ
    // --------------------------------

    test('should display the final score', async ({ page }) => {

        // Answer and move through all questions
        for (let i = 0; i < 5; i++) {

            await page.locator('#option1').click();

            await page.locator('.submit-btn').click();

            await page.locator('.next-btn').click();

        }

        // Quiz should disappear
        await expect(page.locator('#quiz'))
            .toBeHidden();

        // Score screen should appear
        await expect(page.locator('#score'))
            .toBeVisible();

        await expect(page.locator('#finalScore'))
            .toContainText('Your Score:');

    });

});


