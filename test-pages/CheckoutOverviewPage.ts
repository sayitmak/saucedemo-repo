import {Page, Locator} from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly checkoutOverviewPgTitle: Locator;
    readonly checkoutList: Locator;
    readonly totalPrice: Locator;


    constructor(page: Page){
        this.page = page;
        this.checkoutOverviewPgTitle = page.locator('[data-test="title"]');
        this.checkoutList = page.locator('[data-test="cart-list"] [data-test="inventory-item"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
   
       
     
    }   


}