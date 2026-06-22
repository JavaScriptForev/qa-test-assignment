import { test, expect } from '@playwright/test';
import { InputsPage } from '../pages/inputs.page';
import { testData } from '../fixtures/test-data';

test.describe('Inputs Page Tests', () => {
    let inputsPage: InputsPage;

    test.beforeEach(async ({ page }) => {
        inputsPage = new InputsPage(page);
        await inputsPage.goto();
    });

    test('TC-05: Заполнение всех полей формы и проверка Output', async () => {
        const testInputs = testData.inputs;

        // Заполняем форму
        await inputsPage.fillForm({
            number: testInputs.number,
            text: testInputs.text,
            password: testInputs.password,
            date: testInputs.date
        });

        // Нажимаем кнопку Display Inputs, чтобы показать результат
        await inputsPage.clickDisplayButton();

        // Проверяем, что данные отобразились в Output
        const outputText = await inputsPage.getOutputText();
        expect(outputText).toContain(testInputs.number);
        expect(outputText).toContain(testInputs.text);
        expect(outputText).toContain(testInputs.date);
        // Пароль не отображается в Output (это нормально)
    });

    test('TC-06: Очистка всех полей после заполнения', async () => {
        const testInputs = testData.inputs;

        // Заполняем форму
        await inputsPage.fillForm({
            number: testInputs.number,
            text: testInputs.text,
            password: testInputs.password,
            date: testInputs.date
        });

        // Проверяем, что поля заполнены
        const valuesBefore = await inputsPage.getInputValues();
        expect(valuesBefore.number).toBe(testInputs.number);
        expect(valuesBefore.text).toBe(testInputs.text);
        expect(valuesBefore.password).toBe(testInputs.password);
        expect(valuesBefore.date).toBe(testInputs.date);

        // Очищаем форму
        await inputsPage.clearForm();

        // Проверяем, что поля пустые
        const valuesAfter = await inputsPage.getInputValues();
        expect(valuesAfter.number).toBe('');
        expect(valuesAfter.text).toBe('');
        expect(valuesAfter.password).toBe('');
        expect(valuesAfter.date).toBe('');
    });

    test('TC-07: Заполнение полей различными типами данных', async () => {
        // Тестируем разные типы данных для Number поля
        const testCases = [
            { number: '42', text: 'Answer', password: 'secret', date: '2024-12-31' },
            { number: '-10', text: 'Negative', password: '12345', date: '2024-01-01' },
            { number: '0', text: 'Zero', password: '!@#$%', date: '2024-06-15' },
            { number: '3.14', text: 'Pi', password: 'password123', date: '2024-03-14' }
        ];

        for (const testCase of testCases) {
            // Заполняем форму
            await inputsPage.fillForm(testCase);

            // Нажимаем кнопку Display Inputs
            await inputsPage.clickDisplayButton();

            // Проверяем Output
            const outputText = await inputsPage.getOutputText();
            expect(outputText).toContain(testCase.number);
            expect(outputText).toContain(testCase.text);

            // Очищаем перед следующим тестом
            await inputsPage.clearForm();
        }
    });
});