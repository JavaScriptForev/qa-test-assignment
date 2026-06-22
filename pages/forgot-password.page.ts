import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ForgotPasswordPage extends BasePage {
    readonly emailInput: Locator;
    readonly submitButton: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('#email');
        this.submitButton = page.getByRole('button', { name: 'Retrieve password' });
        this.flashMessage = page.locator('#confirmation-alert');
    }

    async goto() {
        await super.goto('https://practice.expandtesting.com/forgot-password');
        await this.waitForElement(this.emailInput);
    }

    async submitEmail(email: string) {
        await this.fill(this.emailInput, email);
        await this.click(this.submitButton);
    }

    async getFlashMessage(): Promise<string> {
        return await this.getText(this.flashMessage);
    }

    async waitForFlashMessage() {
        await this.waitForElement(this.flashMessage, 5000);
    }
}