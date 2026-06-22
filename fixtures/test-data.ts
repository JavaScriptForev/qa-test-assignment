export const testData = {
    // Данные для Login
    login: {
        valid: {
            username: 'practice',
            password: 'SuperSecretPassword!'
        },
        invalid: {
            username: 'wrongUser',
            password: 'WrongPassword'
        }
    },

    // Данные для Inputs
    inputs: {
        number: '12345',
        text: 'Hello World',
        password: 'MySecret123',
        date: '2026-06-22'
    },

    // Данные для Forgot Password
    email: {
        valid: 'test@example.com',
        invalid: [
            'invalid-email',      // без @
            'test@',              // без домена
            '@example.com',       // без локальной части
            'test@example'        // без .домен
        ],
        empty: ''
    },

    // Данные для Autocomplete
    autocomplete: {
        country: 'Canada'
    }
};