import { Page } from '@playwright/test';

export async function checkSiteHealth(page: Page, url: string): Promise<boolean> {
    try {
        const response = await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 10000,
        });
        return response?.status() === 200;
    } catch {
        return false;
    }
}