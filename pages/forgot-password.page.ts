import { Page, Locator } from '@playwright/test';

export class ForgotPasswordPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly retrieveButton: Locator;
    readonly flashMessage: Locator;
    readonly invalidFeedback: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.retrieveButton = page.locator('button[type="submit"]');
        this.flashMessage = page.locator('#flash');
        this.invalidFeedback = page.locator('.invalid-feedback');
    }

    async goto() {
        await this.page.goto('https://practice.expandtesting.com/forgot-password', {
            waitUntil: 'domcontentloaded'
        });
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    }

    async submitEmail(email: string) {
        await this.emailInput.fill(email);
        await this.retrieveButton.click();
    }

    async getFlashMessage(): Promise<string> {
        await this.flashMessage.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.flashMessage.textContent()) || '';
    }

    async getInvalidFeedback(): Promise<string> {
        await this.invalidFeedback.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.invalidFeedback.textContent()) || '';
    }
}