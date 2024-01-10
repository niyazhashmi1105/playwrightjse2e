const { test, expect } = require ('@playwright/test')
const  {LoginPage} = require('../pages/loginpage')
import {HomePage} from '../pages/homepage'

const fs = require("fs")
const testData = JSON.parse(fs.readFileSync(`./testdata/data.json`, `utf-8`))


test.beforeEach('prerequisite- login to application and landing on the homepage', async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage('https://www.saucedemo.com/')
    await loginPage.doLogin(testData.std_user,testData.password)
})
test('count the number of products', async({page})=>{
        
        const homePage = new HomePage(page)
        const prodsCount = await homePage.getProductListCount()
        expect(prodsCount).toBeGreaterThan(5)

})

test('check the products available or not', async({page})=>{
        
    const homePage = new HomePage(page)
    const isAvailable = await homePage.getProductName(testData.isProductAvailable)
    expect(isAvailable).toBe(true)
})

test('Add the product into the cart and assert if it is added or not', async({page})=>{
        
    const homePage = new HomePage(page)
    await homePage.addProductToCart(testData.addProductCart,'#add-to-cart-sauce-labs-bike-light')
    expect(await page.locator('#remove-sauce-labs-bike-light')).toBeVisible()
    expect(await page.locator('.shopping_cart_link > span').textContent()).toBe('1')
})

test('Check the first and last product before applying filter and after applying the filter', async({page})=>{
        
    const homePage = new HomePage(page)
    await homePage.addProductToCart(testData.addProductCart,'#add-to-cart-sauce-labs-bike-light')
    expect(await page.locator('#remove-sauce-labs-bike-light')).toBeVisible()
    expect(await page.locator('.shopping_cart_link > span').textContent()).toBe('1')
    const firstProductBeforeSorting = await homePage.getFirstProductItem()
    expect(firstProductBeforeSorting).toContain('Sauce Labs')
    const lastProductBeforeSorting = await homePage.getLastProductItem()
    expect(lastProductBeforeSorting).toBe('Test.allTheThings() T-Shirt (Red)')
    const selectOption = await homePage.selectDropdownOption('Price (high to low)')
    expect(selectOption).toEqual(expect.arrayContaining(['hilo']))
    const firstProductAfterSorting = await homePage.getFirstProductItem()
    expect(firstProductAfterSorting).toBe(testData.firstProduct)
    const lastProductAfterSorting = await homePage.getLastProductItem()
    expect(lastProductAfterSorting).toBe(testData.lastProduct)

})