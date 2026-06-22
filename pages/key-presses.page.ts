import { Page, Locator } from '@playwright/test';

export class KeyPressesPage {
    readonly page: Page;
    readonly targetInput: Locator;
    readonly resultBlock: Locator;

    constructor(page: Page) {
        this.page = page;
        this.targetInput = page.locator('#target');
        this.resultBlock = page.locator('#result');
    }

    async goto() {
        await this.page.goto('https://practice.expandtesting.com/key-presses', {
            waitUntil: 'domcontentloaded'
        });

        // Блокируем отправку формы, чтобы Enter не перезагружал страницу
        await this.page.evaluate(() => {
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                });
            }
        });

        await this.targetInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.targetInput.click();
    }

    async pressKey(key: string) {
        await this.page.keyboard.press(key);
    }

    async getResultText(): Promise<string> {
        await this.resultBlock.waitFor({
            state: 'visible',
            timeout: 5000
        });
        return (await this.resultBlock.textContent()) || '';
    }
}