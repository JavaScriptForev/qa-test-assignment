import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckboxesPage extends BasePage {
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;

    constructor(page: Page) {
        super(page);
        this.checkbox1 = page.locator('#checkbox1');
        this.checkbox2 = page.locator('#checkbox2');
    }

    async goto() {
        await super.goto('https://practice.expandtesting.com/checkboxes');
        await this.waitForElement(this.checkbox1);
    }

    async toggleCheckbox1() {
        await this.click(this.checkbox1);
    }

    async toggleCheckbox2() {
        await this.click(this.checkbox2);
    }

    async isCheckbox1Checked(): Promise<boolean> {
        return await this.checkbox1.isChecked();
    }

    async isCheckbox2Checked(): Promise<boolean> {
        return await this.checkbox2.isChecked();
    }

    async resetCheckboxes() {
        if (await this.isCheckbox1Checked()) {
            await this.toggleCheckbox1();
        }
        if (await this.isCheckbox2Checked()) {
            await this.toggleCheckbox2();
        }
    }
}