export const URLS = {
    base: 'https://practice.expandtesting.com',
    login: '/login',
    autocomplete: '/autocomplete',
    checkboxes: '/checkboxes',
    forgotPassword: '/forgot-password',
    inputs: '/inputs',
    keyPresses: '/key-presses',
} as const;

export const TIMEOUTS = {
    short: 5000,
    medium: 10000,
    long: 30000,
    extraLong: 60000,
} as const;

export const TEST_DATA = {
    validUser: {
        username: 'practice',
        password: 'SuperSecretPassword!',
    },
    invalidUser: {
        username: 'wrongUser',
        password: 'WrongPassword',
    },
    countries: {
        canada: 'Canada',
        mexico: 'Mexico',
        usa: 'United States of America',
    },
    messages: {
        login: {
            success: 'You logged into a secure area!',
            invalidPassword: 'Your password is invalid!',
            invalidUsername: 'Your username is invalid!',
        },
    },
} as const;