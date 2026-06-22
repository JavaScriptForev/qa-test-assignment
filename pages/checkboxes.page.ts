import { Page, Locator } from '@playwright/test';

export class CheckboxesPage {
    readonly page: Page;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox1 = page.locator('#checkbox1');
        this.checkbox2 = page.locator('#checkbox2');
    }

    async goto() {
        await this.page.goto('https://practice.expandtesting.com/checkboxes', {
            waitUntil: 'domcontentloaded'
        });
        await this.checkbox1.waitFor({ state: 'visible', timeout: 10000 });
    }

    async checkCheckbox(checkbox: Locator) {
        if (!await checkbox.isChecked()) {
            await checkbox.check();
        }
    }

    async uncheckCheckbox(checkbox: Locator) {
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
        }
    }

    async isCheckboxChecked(checkbox: Locator): Promise<boolean> {
        return await checkbox.isChecked();
    }

    async reloadPage() {
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await this.checkbox1.waitFor({ state: 'visible', timeout: 10000 });
    }
}