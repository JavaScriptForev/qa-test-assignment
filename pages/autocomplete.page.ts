import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AutocompletePage extends BasePage {
    readonly searchInput: Locator;
    readonly suggestionsList: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#country');
        this.suggestionsList = page.locator('#countryautocomplete-list');
    }

    async goto() {
        await super.goto('https://practice.expandtesting.com/autocomplete');
        await this.waitForElement(this.searchInput);
    }

    async searchForCountry(query: string) {
        await this.fill(this.searchInput, query);
        await this.waitForElement(this.suggestionsList);
    }

    async selectCountry(country: string) {
        const option = this.suggestionsList.locator('div', {
            has: this.page.locator(`input[value='${country}']`),
        });
        await this.click(option);
    }

    async getSelectedValue(): Promise<string> {
        return await this.getInputValue(this.searchInput);
    }
}