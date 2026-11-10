import { test, expect } from '@playwright/test';
import { LoginPage } from '../../test-pages/LoginPage';
import loginData from '../../test-data/loginData.json';
import { HomePage } from '../../test-pages/HomePage';
import { ShoppingCartPage } from '../../test-pages/ShoppingCartPage';
import { CheckoutInfoPage } from '../../test-pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../../test-pages/CheckoutOverviewPage';


test('E2E test for Saucedemo', async ({ page }) => {
    //Step 1: Navigate to the login page
    const loginPage = new LoginPage(page);
    await loginPage.gotologinPage();
    await expect(page).toHaveTitle('Swag Labs');

    //Step 2: Login to the application
    await loginPage.login(
        loginData.valid_user.username, loginData.valid_user.password);
    await expect(page).toHaveTitle('Swag Labs');

    //Step 3: Verify the home page
    const homePage = new HomePage(page);
    await expect(homePage.inventoryContainer).toBeVisible();


    //Step 4: Add items to the cart
    await expect(homePage.itemList).toHaveCount(6);
    let itemAdded = 0;
    for (const item of await homePage.itemList.all()) {
        const name = await item.locator(homePage.itemName).innerText();
        const description = await item.locator(homePage.itemDescription).innerText();
        const price = await item.locator(homePage.itemPrice).innerText();

        if (name.includes('T-Shirt') || name.includes('Backpack') || name.includes('Jacket')) {
            // console.log('Found T-Shirt item:', { name, price });
            await item.locator(homePage.Add2CartBttn).click();
            itemAdded++;
            await expect(homePage.ItemInCart).toBeVisible();
        }
            
    }

    //Step 5: Navigate to the shopping cart if there are items in the cart
    if (itemAdded > 0) {
        console.log('Item added to cart:', itemAdded);
        await homePage.ItemInCart.click();

      
    }
 
    //Step 6: Verify the shopping cart
        const shoppingCartPage = new ShoppingCartPage(page);
        await expect(shoppingCartPage.shoppingCartPgTitle).toBeVisible();
        await expect(shoppingCartPage.cartList).toHaveCount(itemAdded);
        await shoppingCartPage.checkoutBtn.click();

    //Step 7: Verify the checkout info page
    const checkoutInfoPage = new CheckoutInfoPage(page);
    await expect(checkoutInfoPage.checkoutInfoPgView).toBeVisible();
    await checkoutInfoPage.firstNameInput.fill('John');
    await checkoutInfoPage.lastNameInput.fill('Doe');
    await checkoutInfoPage.zipCodeInput.fill('12345');
    await checkoutInfoPage.continueBtn.click();

    //Step 8: Verify the checkout overview page
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.checkoutOverviewPgTitle).toHaveText('Checkout: Overview');
    await expect(checkoutOverviewPage.checkoutList).toHaveCount(itemAdded);
    //console.log('Total price: ', await checkoutOverviewPage.totalPrice.innerText());
    const totalPrice = await checkoutOverviewPage.totalPrice.innerText();
    const totalPriceNumber = totalPrice.split('$')[1];

    if (parseFloat(totalPriceNumber) > 100) {
        console.log('Total price is greater than $100: ==>', totalPriceNumber);
    }
});


