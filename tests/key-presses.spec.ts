import { test, expect } from '@playwright/test';
import { KeyPressesPage } from '../pages/key-presses.page';

test.describe('Key Presses Page Tests', () => {
    let keyPressesPage: KeyPressesPage;

    test.beforeEach(async ({ page }) => {
        keyPressesPage = new KeyPressesPage(page);
        await keyPressesPage.goto();
    });

    test('TC-18: Нажатие Escape', async () => {
        await keyPressesPage.pressKey('Escape');
        const result = await keyPressesPage.getResultText();
        expect(result).toContain('You entered: ESCAPE');
    });

    test('TC-19: Нажатие Control', async () => {
        await keyPressesPage.pressKey('Control');
        const result = await keyPressesPage.getResultText();
        expect(result).toContain('You entered: CONTROL');
    });

    test('TC-20: Нажатие Enter', async () => {
        await keyPressesPage.pressKey('Enter');
        const result = await keyPressesPage.getResultText();
        expect(result).toContain('You entered: ENTER');
    });

    test('TC-21: Нажатие Backspace', async () => {
        await keyPressesPage.pressKey('Backspace');
        const result = await keyPressesPage.getResultText();
        expect(result).toContain('You entered: BACK_SPACE');
    });

    test('TC-22: Нажатие Tab', async () => {
        await keyPressesPage.pressKey('Tab');
        const result = await keyPressesPage.getResultText();
        expect(result).toContain('You entered: TAB');
    });

    test('TC-23: Нажатие Shift', async () => {
        await keyPressesPage.pressKey('Shift');
        const result = await keyPressesPage.getResultText();
        expect(result).toContain('You entered: SHIFT');
    });

    test('TC-24: Нажатие Alt', async () => {
        await keyPressesPage.pressKey('Alt');
        const result = await keyPressesPage.getResultText();
        expect(result).toContain('You entered: ALT');
    });
});