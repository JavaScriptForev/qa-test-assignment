import { Page, Locator } from '@playwright/test';

export class AutocompletePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly submitButton: Locator;
    readonly resultBlock: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#country');
        this.submitButton = page.locator('button:has-text("Submit")');
        this.resultBlock = page.locator('#result');
    }

    async goto() {
        await this.page.goto('https://practice.expandtesting.com/autocomplete', {
            waitUntil: 'domcontentloaded'
        });
        await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    }

    async searchCountry(country: string) {
        await this.searchInput.fill(country);
        // Ждём появления предложений в автокомплите
        await this.page.waitForTimeout(1500);
    }

    async selectSuggestionByText(text: string) {
        // Ищем любой элемент, содержащий текст, и кликаем по нему
        const suggestion = this.page.locator(`text=${text}`).first();
        await suggestion.waitFor({ state: 'visible', timeout: 5000 });
        await suggestion.click();
    }

    async getInputValue(): Promise<string> {
        return await this.searchInput.inputValue();
    }
}