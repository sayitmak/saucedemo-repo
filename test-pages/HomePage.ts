import {Page, Locator} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly itemList: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly Add2CartBttn: Locator;
    readonly ItemInCart: Locator;


    constructor(page: Page){
        this.page = page;
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
        this.itemList = page.locator('[data-test="inventory-item"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.Add2CartBttn = page.locator('[class="btn btn_primary btn_small btn_inventory "]');
        this.ItemInCart = page.locator('[data-test="shopping-cart-link"]');

    }   


}