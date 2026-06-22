import { test, expect } from '@playwright/test';
import { KeyPressesPage } from '../../pages/key-presses.page';

test.describe('Key Presses Page Tests', () => {
    let keyPressesPage: KeyPressesPage;

    test.beforeEach(async ({ page }) => {
        keyPressesPage = new KeyPressesPage(page);
        await keyPressesPage.goto();
    });

    test('TC-18: Нажатие Escape', async () => {
        await keyPressesPage.pressKey('Escape');
        expect(await keyPressesPage.getResultText()).toContain('You entered: ESCAPE');
    });

    test('TC-19: Нажатие Control', async () => {
        await keyPressesPage.pressKey('Control');
        expect(await keyPressesPage.getResultText()).toContain('You entered: CONTROL');
    });

    test('TC-20: Нажатие Enter', async ({ page }) => {
        await page.evaluate(() => {
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', (e) => e.preventDefault());
            }
        });

        await keyPressesPage.pressKey('Enter');
        expect(await keyPressesPage.getResultText()).toContain('You entered: ENTER');
    });

    test('TC-21: Нажатие Backspace', async () => {
        await keyPressesPage.pressKey('Backspace');
        expect(await keyPressesPage.getResultText()).toContain('You entered: BACK_SPACE');
    });

    test('TC-22: Нажатие Tab', async () => {
        await keyPressesPage.pressKey('Tab');
        expect(await keyPressesPage.getResultText()).toContain('You entered: TAB');
    });

    test('TC-23: Нажатие Shift', async () => {
        await keyPressesPage.pressKey('Shift');
        expect(await keyPressesPage.getResultText()).toContain('You entered: SHIFT');
    });

    test('TC-24: Нажатие Alt', async () => {
        await keyPressesPage.pressKey('Alt');
        expect(await keyPressesPage.getResultText()).toContain('You entered: ALT');
    });
});