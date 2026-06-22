import { Page } from '@playwright/test';

export async function safeGoto(
    page: Page,
    url: string,
    maxRetries: number = 5
): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 60000,
            });
            console.log(`✅ Успешно загружено: ${url} (попытка ${attempt})`);
            return;
        } catch (error) {
            lastError = error as Error;
            const waitTime = attempt * 3000;
            console.log(`⚠️ Попытка ${attempt}/${maxRetries} не удалась: ${error}`);
            console.log(`⏳ Ждём ${waitTime/1000} секунд перед следующей попыткой...`);

            if (attempt < maxRetries) {
                await page.waitForTimeout(waitTime);
            }
        }
    }

    throw new Error(`❌ Не удалось загрузить ${url} после ${maxRetries} попыток: ${lastError}`);
}