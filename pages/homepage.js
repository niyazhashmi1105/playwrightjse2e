import {BasePage} from '../pages/base'
export class HomePage extends BasePage{

    constructor(page){
        super(page)
        this.page = page
        this.productsList = "//div[@class='inventory_item_label']/a/div"
        this.productsCost = ".pricebar > div"  
    }
    
    async getProductListCount(){
        const productsCount = await this.page.$$(this.productsList)
        return productsCount.length
        
    }

    async getProductName(productName){
        const products = await this.page.$$(this.productsList)
        for(const product of products){
            if(productName === await product.textContent()){
                    return true
                    break;
            }
        }
    }

    async addProductToCart(productName, selector){
        const productsCount = await this.page.$$(this.productsList)
        for(const products of productsCount){
            if(productName === await products.textContent()){
                    await this.page.locator(selector).click()
                    break;
            }
        }
    }

    async getFirstProductItem(){
        const firstItem = await this.page.locator(this.productsList).first().textContent()
        return firstItem
    }         
            
    async getLastProductItem(){
            const lastItem = await this.page.locator(this.productsList).nth(-1).textContent()
            return lastItem  
        }

}