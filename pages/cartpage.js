export class CartPage{

    constructor(page){
        this.page = page
        this.products = ".inventory_item_name"
        this.productPrices = ".inventory_item_price"
        this.removeBtn = "//button[text()='Remove']"
    }

    async getProductsCount(){
        const productsCount = await this.page.$$(this.products)
        //console.log("products available ", await productsCount.length)
        return await productsCount.length
    }

    async getProductsPrices(){
            const prices = await this.page.locator(this.productPrices).allTextContents()
            return await prices.length
    }
    
    async getProductsAfterRemoval(productName){

        const prods = await this.page.$$(this.products)
        let count=0;
        for (const prod of prods){
         //console.log("Added Products ", await prod.textContent())
            count++
            if(productName === await prod.textContent()){
                await this.page.locator(this.removeBtn).nth(count-1).click()
                //console.log("count ", count)
                break
            }
        }
    }

    async click(selector){
        await this.page.locator(selector).click()
    }

    async fillDetails(locator,value){
        await this.page.fill(locator,value) 
    }

    async getText(selector){
        return await this.page.locator(selector).textContent()
    }

    async isVsibleText(selector){
        return await this.page.locator(selector).isVisible()
    }
}