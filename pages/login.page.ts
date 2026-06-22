import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#submit-login'); // 👈 ИСПРАВЛЕНО!
        this.flashMessage = page.locator('#flash');
    }

    async goto() {
        await this.page.goto('https://practice.expandtesting.com/login', {
            waitUntil: 'domcontentloaded'
        });
        // Ждём, пока появится поле username
        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getFlashMessageText(): Promise<string> {
        // Ждём появления сообщения
        await this.flashMessage.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.flashMessage.textContent()) || '';
    }
}