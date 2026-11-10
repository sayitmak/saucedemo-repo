import {test, expect} from '@playwright/test';
import {LoginPage} from '../../test-pages/LoginPage';
import loginData from '../../test-data/loginData.json';


test('Valid Login test', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotologinPage();
    //await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.login(
        loginData.valid_user.username, loginData.valid_user.password);

    //await loginPage.verifyLoginSuccess();
    await expect(page).toHaveTitle('Swag Labs');
    console.log('Login successful');
});



test('Invalid Login test', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotologinPage();
    //await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.login(
        loginData.invalid_user.username, loginData.invalid_user.password);

    //await loginPage.verifyLoginError('Epic sadface: Sorry, you have been locked out');
    await expect(loginPage.errorText).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

