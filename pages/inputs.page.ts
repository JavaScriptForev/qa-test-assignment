import { Page, Locator } from '@playwright/test';

export class InputsPage {
    readonly page: Page;
    readonly inputNumber: Locator;
    readonly inputText: Locator;
    readonly inputPassword: Locator;
    readonly inputDate: Locator;
    readonly outputBlock: Locator;
    readonly clearButton: Locator;
    readonly displayButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputNumber = page.locator('#input-number');
        this.inputText = page.locator('#input-text');
        this.inputPassword = page.locator('#input-password');
        this.inputDate = page.locator('#input-date');
        this.outputBlock = page.locator('#result');
        this.clearButton = page.locator('#btn-clear-inputs');
        this.displayButton = page.locator('#btn-display-inputs');
    }

    async goto() {
        await this.page.goto('https://practice.expandtesting.com/inputs', {
            waitUntil: 'domcontentloaded'
        });
        // Ждём загрузки первого поля
        await this.inputNumber.waitFor({ state: 'visible', timeout: 10000 });
    }

    async fillForm(data: { number?: string; text?: string; password?: string; date?: string }) {
        if (data.number) await this.inputNumber.fill(data.number);
        if (data.text) await this.inputText.fill(data.text);
        if (data.password) await this.inputPassword.fill(data.password);
        if (data.date) await this.inputDate.fill(data.date);
    }

    async clickDisplayButton() {
        await this.displayButton.click();
        // Ждём появления результата
        await this.outputBlock.waitFor({ state: 'visible', timeout: 5000 });
    }

    async getOutputText(): Promise<string> {
        await this.outputBlock.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.outputBlock.textContent()) || '';
    }

    async clearForm() {
        await this.clearButton.click();
        // Ждём, пока поля очистятся
        await this.page.waitForTimeout(500);
    }

    async getInputValues() {
        return {
            number: await this.inputNumber.inputValue(),
            text: await this.inputText.inputValue(),
            password: await this.inputPassword.inputValue(),
            date: await this.inputDate.inputValue()
        };
    }
}