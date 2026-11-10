import { test, expect } from '@playwright/test';
import { LoginPage } from '/Users/sayit/Automation_Projects/Saucedemo_project/test-pages/LoginPage.ts';
import loginData from '../../test-data/loginDataNew.json';


loginData.forEach((data, i) => {
    if (!data.run) return;
    test(`login test #${i+1} -${data.username}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.gotologinPage();
        await loginPage.login(data.username, data.password);
        if (data.expected === 'success') {
            await expect(page).toHaveTitle('Swag Labs');
        } else {
            await expect(loginPage.errorText).toHaveText(data.expected);        
        }
    });
});

