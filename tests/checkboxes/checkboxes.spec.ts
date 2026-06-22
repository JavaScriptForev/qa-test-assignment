import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../../pages/checkboxes.page';

test.describe('Checkboxes Page Tests', () => {
    let checkboxesPage: CheckboxesPage;

    test.beforeEach(async ({ page }) => {
        checkboxesPage = new CheckboxesPage(page);
        await checkboxesPage.goto();
    });

    test('TC-14: Активация (выбор) чекбокса', async () => {
        await checkboxesPage.resetCheckboxes();
        await checkboxesPage.toggleCheckbox1();
        expect(await checkboxesPage.isCheckbox1Checked()).toBe(true);
    });

    test('TC-15: Деактивация (снятие выбора) чекбокса', async () => {
        await checkboxesPage.resetCheckboxes();
        await checkboxesPage.toggleCheckbox1();
        await checkboxesPage.toggleCheckbox1();
        expect(await checkboxesPage.isCheckbox1Checked()).toBe(false);
    });

    test('TC-16: Переключение состояния нескольких чекбоксов', async () => {
        await checkboxesPage.resetCheckboxes();
        await checkboxesPage.toggleCheckbox1();
        await checkboxesPage.toggleCheckbox2();
        expect(await checkboxesPage.isCheckbox1Checked()).toBe(true);
        expect(await checkboxesPage.isCheckbox2Checked()).toBe(true);
    });

    test('TC-17: Проверка состояния чекбокса после перезагрузки страницы', async ({ page }) => {
        const initialState = await checkboxesPage.isCheckbox2Checked();

        await checkboxesPage.toggleCheckbox2();
        const newState = await checkboxesPage.isCheckbox2Checked();
        expect(newState).toBe(!initialState);  // Состояние точно изменилось

        await page.reload();
        await checkboxesPage.waitForElement(checkboxesPage.checkbox2);

        const afterReloadState = await checkboxesPage.isCheckbox2Checked();
        expect(afterReloadState).toBe(initialState);
    });
});