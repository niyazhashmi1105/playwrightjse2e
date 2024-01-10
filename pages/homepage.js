export class HomePage{

    constructor(page){
        this.page = page
        this.productsList = "//div[@class='inventory_item_label']/a/div"
        this.productsCost = ".pricebar > div"  
        this.selectOptions = ".product_sort_container option"
        this.filterOptions = ".product_sort_container"
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

    async selectDropdownOption(value){

        const options = await this.page.$$(this.selectOptions)
        for(const option of options){
                let val = await option.textContent()
            if(val.includes(value)){
                const selectedVal = await this.page.selectOption(this.filterOptions,{label:value})
                return selectedVal
                break
            }
        }
        return null
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