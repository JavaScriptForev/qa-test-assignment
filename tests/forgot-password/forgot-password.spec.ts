import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';

test.describe('Forgot Password Page Tests', () => {
    let forgotPasswordPage: ForgotPasswordPage;

    test.beforeEach(async ({ page }) => {
        forgotPasswordPage = new ForgotPasswordPage(page);
        await forgotPasswordPage.goto();
    });

    test('TC-08: Валидный email', async () => {
        await forgotPasswordPage.submitEmail('test@example.com');
        await forgotPasswordPage.waitForFlashMessage();
        const message = await forgotPasswordPage.getFlashMessage();
        expect(message).toContain('An e-mail has been sent to you');
    });

    test('TC-09: Невалидный email - без @', async () => {
        await forgotPasswordPage.submitEmail('testexample.com');
        // 👇 Теперь используем метод из BasePage
        const isVisible = await forgotPasswordPage.isElementVisible(
            forgotPasswordPage.flashMessage,
            3000
        );
        expect(isVisible).toBe(false);
    });

    test('TC-10: Невалидный email - без домена', async () => {
        await forgotPasswordPage.submitEmail('test@');
        const isVisible = await forgotPasswordPage.isElementVisible(
            forgotPasswordPage.flashMessage,
            3000
        );
        expect(isVisible).toBe(false);
    });

    test('TC-11: Невалидный email - без локальной части', async () => {
        await forgotPasswordPage.submitEmail('@example.com');
        const isVisible = await forgotPasswordPage.isElementVisible(
            forgotPasswordPage.flashMessage,
            3000
        );
        expect(isVisible).toBe(false);
    });

    test('TC-12: Невалидный email - без точки в домене', async () => {
        await forgotPasswordPage.submitEmail('test@examplecom');
        const isVisible = await forgotPasswordPage.isElementVisible(
            forgotPasswordPage.flashMessage,
            3000
        );
        expect(isVisible).toBe(false);
    });

    test('TC-13: Пустой email', async () => {
        await forgotPasswordPage.submitEmail('');
        const isVisible = await forgotPasswordPage.isElementVisible(
            forgotPasswordPage.flashMessage,
            3000
        );
        expect(isVisible).toBe(false);
    });
});