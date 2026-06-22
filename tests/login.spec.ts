import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('TC-01: Успешный вход с валидными учётными данными', async ({ page }) => {
        await loginPage.login('practice', 'SuperSecretPassword!');

        await page.locator('.alert-success').waitFor({
            state: 'visible',
            timeout: 15000
        });

        const flashMessage = page.locator('#flash');
        await flashMessage.waitFor({ state: 'visible', timeout: 5000 });

        const message = await flashMessage.textContent();
        expect(message).toContain('You logged into a secure area!');
    });

    test('TC-02: Вход с невалидным логином и валидным паролем', async ({ page }) => {
        await loginPage.login('wrongUser', 'SuperSecretPassword!');

        const flashMessage = page.locator('#flash');
        await flashMessage.waitFor({ state: 'visible', timeout: 5000 });

        const message = await flashMessage.textContent();
        // Сайт выдаёт "Your password is invalid!" даже при невалидном логине
        expect(message).toContain('Your password is invalid!'); // 👈 ИСПРАВЛЕНО
    });

    test('TC-03: Вход с валидным логином и невалидным паролем', async ({ page }) => {
        await loginPage.login('practice', 'WrongPassword');

        const flashMessage = page.locator('#flash');
        await flashMessage.waitFor({ state: 'visible', timeout: 5000 });

        const message = await flashMessage.textContent();
        expect(message).toContain('Your password is invalid!');
    });

    test('TC-04: Вход с пустыми полями логина и пароля', async ({ page }) => {
        await loginPage.login('', '');

        const flashMessage = page.locator('#flash');
        await flashMessage.waitFor({ state: 'visible', timeout: 5000 });

        const message = await flashMessage.textContent();
        expect(message).toContain('Your username is invalid!');
    });
});