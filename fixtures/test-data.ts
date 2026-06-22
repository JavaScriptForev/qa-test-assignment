export const testData = {
    autocomplete: {
        country: 'Canada',
        searchQuery: 'Can',
        alternativeCountry: 'Mexico',
    },
    login: {
        validUser: {
            username: 'practice',
            password: 'SuperSecretPassword!',
        },
        invalidUser: {
            username: 'wrongUser',
            password: 'WrongPassword',
        },
        emptyUser: {
            username: '',
            password: '',
        },
    },
    messages: {
        login: {
            success: 'You logged into a secure area!',
            invalidPassword: 'Your password is invalid!',
            invalidUsername: 'Your username is invalid!',
        },
    },
};