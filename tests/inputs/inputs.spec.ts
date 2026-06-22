import { test, expect } from '@playwright/test';
import { InputsPage } from '../../pages/inputs.page';

test.describe('Inputs Page Tests', () => {
    let inputsPage: InputsPage;

    test.beforeEach(async ({ page }) => {
        inputsPage = new InputsPage(page);
        await inputsPage.goto();
    });

    test('TC-05: Заполнение поля Number и проверка значения', async () => {
        const testValue = 42;
        await inputsPage.enterNumber(testValue);
        const value = await inputsPage.getNumberValue();
        expect(value).toBe(String(testValue));
    });

    test('TC-06: Очистка поля Number после заполнения', async () => {
        await inputsPage.enterNumber(123);
        await inputsPage.clearNumber();
        const value = await inputsPage.getNumberValue();
        expect(value).toBe('');
    });

    test('TC-07: Заполнение поля Number различными типами данных', async () => {
        const testValues = ['0', '-5', '3.14', '999'];
        for (const val of testValues) {
            await inputsPage.enterNumber(val);
            const value = await inputsPage.getNumberValue();
            expect(value).toBe(val);
        }
    });
});