const { test, expect } = require('@playwright/test');

test.describe.serial('Purchase flow', () => {

    //Go to the login page
    test.beforeEach('login test', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.click('[data-test="username"]');

        await page.fill('[data-test="username"]', 'standard_user');

        await page.click('[data-test="password"]');

        await page.fill('[data-test="password"]', 'secret_sauce');

        await page.click('[data-test="login-button"]');


        // Assert that we have logged in successfully by checking the URL
        await expect(page).toHaveURL(/inventory\.html/);
    });

    //Add items to cart correctly
    test('add items to cart', async ({ page }) => {

        const product1 = page.locator('.inventory_item').nth(0);
        const product2 = page.locator('.inventory_item').nth(1);

        const productName1 = await product1.locator('.inventory_item_name').textContent();
        const productName2 = await product2.locator('.inventory_item_name').textContent();

        await product1.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await product2.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        await page.click('[data-test="shopping-cart-link"]');

        const cartItems = await page.locator('.inventory_item_name').allTextContents();
        expect(cartItems).toEqual(expect.arrayContaining([productName1, productName2]));
    });


    test('checkout items', async ({ page }) => {

        const product1 = page.locator('.inventory_item').nth(0);
        const product2 = page.locator('.inventory_item').nth(1);

        await product1.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await product2.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        await page.click('[data-test="shopping-cart-link"]');

        await page.click('[data-test="checkout"]');

        await page.click('[data-test="continue"]');

        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });
});