import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class KeyPressesPage extends BasePage {
    readonly targetInput: Locator;
    readonly resultDisplay: Locator;

    constructor(page: Page) {
        super(page);
        this.targetInput = page.locator('#target');
        this.resultDisplay = page.locator('#result');
    }

    async goto() {
        await super.goto('https://practice.expandtesting.com/key-presses');
        await this.waitForElement(this.targetInput);
    }

    async pressKey(key: string) {
        await this.click(this.targetInput);
        await this.page.keyboard.press(key);
    }

    async getResultText(): Promise<string> {
        return await this.getText(this.resultDisplay);
    }

    async clearResult() {
        await this.click(this.targetInput);
        await this.page.keyboard.press('Escape');
        await this.resultDisplay.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    }
}