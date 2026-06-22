import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InputsPage extends BasePage {
    readonly inputNumber: Locator;

    constructor(page: Page) {
        super(page);
        this.inputNumber = page.locator('#input-number');
    }

    async goto() {
        await super.goto('https://practice.expandtesting.com/inputs');
        await this.waitForElement(this.inputNumber);
    }

    async enterNumber(value: number | string) {
        await this.fill(this.inputNumber, String(value));
    }

    async getNumberValue(): Promise<string> {
        return await this.getInputValue(this.inputNumber);
    }

    async clearNumber() {
        await this.clear(this.inputNumber);
    }
}