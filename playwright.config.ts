import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 2,  // Всегда повторяем 2 раза
    workers: process.env.CI ? 1 : 4,  // Локально 4 воркера
    reporter: 'html',
    use: {
        baseURL: 'https://practice.expandtesting.com',
        trace: 'on-first-retry',
        actionTimeout: 15000,
        navigationTimeout: 60000,  // Ждём загрузку 60 секунд
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});