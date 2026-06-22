import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#submit-login');
        this.flashMessage = page.locator('#flash');
    }

    async goto() {
        await super.goto('https://practice.expandtesting.com/login');
        await this.waitForElement(this.usernameInput);
    }

    async login(username: string, password: string) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async getFlashMessage(): Promise<string> {
        return await this.getText(this.flashMessage);
    }

    async waitForFlashMessage() {
        await this.waitForElement(this.flashMessage, 5000);
    }
}