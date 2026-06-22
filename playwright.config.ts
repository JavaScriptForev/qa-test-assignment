import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 5,
    workers: process.env.CI ? 1 : 1,
    reporter: 'html',
    use: {
        baseURL: 'https://practice.expandtesting.com',
        trace: 'on-first-retry',
        actionTimeout: 60000,
        navigationTimeout: 180000,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});