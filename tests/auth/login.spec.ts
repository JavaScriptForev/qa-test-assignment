import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { TEST_DATA } from '../../config/constants';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('TC-01: Успешный вход с валидными учётными данными', async ({ page }) => {
        await loginPage.login(TEST_DATA.validUser.username, TEST_DATA.validUser.password);
        await expect(page).toHaveURL(/secure/);
    });

    test('TC-02: Вход с невалидным логином и валидным паролем', async () => {
        await loginPage.login(TEST_DATA.invalidUser.username, TEST_DATA.validUser.password);
        await loginPage.waitForFlashMessage();
        expect(await loginPage.getFlashMessage()).toContain(TEST_DATA.messages.login.invalidPassword);
    });

    test('TC-03: Вход с валидным логином и невалидным паролем', async () => {
        await loginPage.login(TEST_DATA.validUser.username, TEST_DATA.invalidUser.password);
        await loginPage.waitForFlashMessage();
        expect(await loginPage.getFlashMessage()).toContain(TEST_DATA.messages.login.invalidPassword);
    });

    test('TC-04: Вход с пустыми полями логина и пароля', async () => {
        await loginPage.login('', '');
        await loginPage.waitForFlashMessage();
        expect(await loginPage.getFlashMessage()).toContain(TEST_DATA.messages.login.invalidUsername);
    });
});