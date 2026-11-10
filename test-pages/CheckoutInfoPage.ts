import {Page, Locator} from '@playwright/test';

export class CheckoutInfoPage {
    readonly page: Page;
    readonly checkoutInfoPgView: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.checkoutInfoPgView = page.locator('[data-test="checkout-info-container"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
       
     
    }   


}