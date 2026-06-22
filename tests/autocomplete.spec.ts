import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../pages/autocomplete.page';
import { testData } from '../fixtures/test-data';

test.describe('Autocomplete Page Tests', () => {
    let autocompletePage: AutocompletePage;

    test.beforeEach(async ({ page }) => {
        autocompletePage = new AutocompletePage(page);
        await autocompletePage.goto();
    });

    test('TC-25: Поиск страны "Canada" через поле автозаполнения', async () => {
        const country = testData.autocomplete.country;

        await autocompletePage.searchCountry(country);

        const value = await autocompletePage.getInputValue();
        expect(value).toBe(country);
    });

    test('TC-26: Выбор предложенного варианта из выпадающего списка', async () => {
        const country = testData.autocomplete.country;

        await autocompletePage.searchCountry(country);
        await autocompletePage.selectSuggestionByText(country);

        const value = await autocompletePage.getInputValue();
        expect(value).toBe(country);
    });

    test('TC-27: Проверка, что выбранное значение отобразилось в поле', async () => {
        const country = testData.autocomplete.country;

        await autocompletePage.searchCountry(country);
        await autocompletePage.selectSuggestionByText(country);

        const value = await autocompletePage.getInputValue();
        expect(value).toBe(country);
    });
});
