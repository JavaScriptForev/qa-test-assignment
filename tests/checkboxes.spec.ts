import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/checkboxes.page';

test.describe('Checkboxes Page Tests', () => {
    let checkboxesPage: CheckboxesPage;

    test.beforeEach(async ({ page }) => {
        checkboxesPage = new CheckboxesPage(page);
        await checkboxesPage.goto();
    });

    test('TC-14: Активация (выбор) чекбокса', async () => {
        await checkboxesPage.checkCheckbox(checkboxesPage.checkbox1);
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox1)).toBe(true);
    });

    test('TC-15: Деактивация (снятие выбора) чекбокса', async () => {
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox2)).toBe(true);
        await checkboxesPage.uncheckCheckbox(checkboxesPage.checkbox2);
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox2)).toBe(false);
    });

    test('TC-16: Переключение состояния нескольких чекбоксов', async () => {
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox1)).toBe(false);
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox2)).toBe(true);

        await checkboxesPage.checkCheckbox(checkboxesPage.checkbox1);
        await checkboxesPage.uncheckCheckbox(checkboxesPage.checkbox2);

        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox1)).toBe(true);
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox2)).toBe(false);

        await checkboxesPage.uncheckCheckbox(checkboxesPage.checkbox1);
        await checkboxesPage.checkCheckbox(checkboxesPage.checkbox2);

        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox1)).toBe(false);
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox2)).toBe(true);
    });

    test('TC-17: Проверка состояния чекбокса после перезагрузки страницы', async () => {
        await checkboxesPage.checkCheckbox(checkboxesPage.checkbox1);
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox1)).toBe(true);

        await checkboxesPage.reloadPage();

        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox1)).toBe(false);
        expect(await checkboxesPage.isCheckboxChecked(checkboxesPage.checkbox2)).toBe(true);
    });
});