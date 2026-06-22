import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../../pages/autocomplete.page';
import { TEST_DATA } from '../../config/constants';

test.describe('Autocomplete Page Tests', () => {
    let autocompletePage: AutocompletePage;

    test.beforeEach(async ({ page }) => {
        autocompletePage = new AutocompletePage(page);
        await autocompletePage.goto();
    });

    test('TC-25: Поиск страны "Canada" через поле автозаполнения', async () => {
        await autocompletePage.searchForCountry(TEST_DATA.countries.canada);
        await autocompletePage.selectCountry(TEST_DATA.countries.canada);
        expect(await autocompletePage.getSelectedValue()).toBe(TEST_DATA.countries.canada);
    });

    test('TC-26: Выбор предложенного варианта из выпадающего списка', async () => {
        await autocompletePage.searchForCountry(TEST_DATA.countries.usa);

        await autocompletePage.suggestionsList.waitFor({
            state: 'visible',
            timeout: 60000  // 60 секунд вместо 30
        });

        await autocompletePage.selectCountry(TEST_DATA.countries.usa);
        const value = await autocompletePage.getSelectedValue();
        expect(value).toBe(TEST_DATA.countries.usa);
    });

    test('TC-27: Проверка, что выбранное значение отобразилось в поле', async () => {
        await autocompletePage.searchForCountry(TEST_DATA.countries.mexico);
        await autocompletePage.selectCountry(TEST_DATA.countries.mexico);
        const value = await autocompletePage.getSelectedValue();
        expect(value).toBe(TEST_DATA.countries.mexico);
        expect(value).not.toBe('');
    });
});