import { Page, Locator } from '@playwright/test';
import { safeGoto } from '../utils/helpers';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await safeGoto(this.page, url, 5);
    }

    async waitForElement(selector: string | Locator, timeout: number = 30000) {
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: 'visible', timeout });
        return locator;
    }

    async click(selector: string | Locator, timeout: number = 30000) {
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: 'visible', timeout });
        await locator.click();
    }

    async fill(selector: string | Locator, text: string) {
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: 'visible', timeout: 30000 });
        await locator.clear();
        await locator.fill(text);
    }

    async getText(selector: string | Locator): Promise<string> {
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        return (await locator.textContent()) || '';
    }

    async getInputValue(selector: string | Locator): Promise<string> {
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        return await locator.inputValue();
    }

    async clear(selector: string | Locator) {
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: 'visible', timeout: 30000 });
        await locator.clear();
    }

    async isElementVisible(selector: string | Locator, timeout: number = 5000): Promise<boolean> {
        try {
            const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }
}