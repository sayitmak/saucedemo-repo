import {Page, Locator} from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly shoppingCartPgTitle: Locator;
    readonly cartList: Locator;
    readonly checkoutBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.shoppingCartPgTitle = page.locator('[data-test="title"]');
        this.cartList = page.locator('[data-test="inventory-item"]');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
     
    }   


}