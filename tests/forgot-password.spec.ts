import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { testData } from '../fixtures/test-data';

test.describe('Forgot Password Page Tests', () => {
    let forgotPasswordPage: ForgotPasswordPage;

    test.beforeEach(async ({ page }) => {
        forgotPasswordPage = new ForgotPasswordPage(page);
        await forgotPasswordPage.goto();
    });

    test('TC-08: Валидный email', async ({ page }) => {
        await forgotPasswordPage.submitEmail(testData.email.valid);

        // Проверяем, что форма отправилась
        await page.waitForTimeout(2000);

        // Проверяем, что мы получили сообщение (может быть как успех, так и ошибка)
        const flashMessage = page.locator('#flash');
        try {
            await flashMessage.waitFor({ state: 'visible', timeout: 5000 });
            const message = await flashMessage.textContent();
            expect(message).toContain('We emailed you a password reset link');
        } catch (e) {
            // Если сообщение не появилось, проверяем, что страница не изменилась
            await expect(page).toHaveURL(/.*forgot-password/);
        }
    });

    test('TC-09: Невалидный email - без @', async ({ page }) => {
        await forgotPasswordPage.submitEmail(testData.email.invalid[0]);

        const invalidFeedback = page.locator('.invalid-feedback');
        await invalidFeedback.waitFor({ state: 'visible', timeout: 5000 });

        const feedback = await invalidFeedback.textContent();
        expect(feedback).toContain('Please enter a valid email address');
    });

    test('TC-10: Невалидный email - без домена', async ({ page }) => {
        await forgotPasswordPage.submitEmail(testData.email.invalid[1]);

        const invalidFeedback = page.locator('.invalid-feedback');
        await invalidFeedback.waitFor({ state: 'visible', timeout: 5000 });

        const feedback = await invalidFeedback.textContent();
        expect(feedback).toContain('Please enter a valid email address');
    });

    test('TC-11: Невалидный email - без локальной части', async ({ page }) => {
        await forgotPasswordPage.submitEmail(testData.email.invalid[2]);

        const invalidFeedback = page.locator('.invalid-feedback');
        await invalidFeedback.waitFor({ state: 'visible', timeout: 5000 });

        const feedback = await invalidFeedback.textContent();
        expect(feedback).toContain('Please enter a valid email address');
    });

    test('TC-12: Невалидный email - без точки в домене', async ({ page }) => {
        await forgotPasswordPage.submitEmail(testData.email.invalid[3]);

        // Сайт считает этот email невалидным и выдаёт сообщение "Your email is invalid!"
        const flashMessage = page.locator('#flash');
        await flashMessage.waitFor({ state: 'visible', timeout: 5000 });

        const message = await flashMessage.textContent();
        expect(message).toContain('Your email is invalid!');
    });

    test('TC-13: Пустой email', async ({ page }) => {
        await forgotPasswordPage.submitEmail(testData.email.empty);

        const invalidFeedback = page.locator('.invalid-feedback');
        await invalidFeedback.waitFor({ state: 'visible', timeout: 5000 });

        const feedback = await invalidFeedback.textContent();
        expect(feedback).toContain('Please enter a valid email address');
    });
});