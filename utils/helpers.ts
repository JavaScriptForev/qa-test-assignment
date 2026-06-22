import { Page } from '@playwright/test';

/**
 * Генерирует случайную строку для тестов
 */
export function generateRandomString(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Ожидает загрузки страницы и проверяет URL
 */
export async function waitForPageLoad(page: Page, expectedUrl?: string) {
    await page.waitForLoadState('networkidle');
    if (expectedUrl) {
        await page.waitForURL(new RegExp(expectedUrl));
    }
}

/**
 * Проверяет, что элемент видим и активен
 */
export async function isElementReady(page: Page, selector: string): Promise<boolean> {
    try {
        const element = page.locator(selector);
        await element.waitFor({ state: 'visible', timeout: 5000 });
        return await element.isEnabled();
    } catch {
        return false;
    }
}

/**
 * Очищает все поля формы
 */
export async function clearFormFields(page: Page, selectors: string[]) {
    for (const selector of selectors) {
        const field = page.locator(selector);
        if (await field.isVisible()) {
            await field.clear();
        }
    }
}