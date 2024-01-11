export class BasePage{

    constructor(page){
        this.page = 
        this.selectOptions = ".product_sort_container option"
        this.filterOptions = ".product_sort_container"
    }

    
    async navigateToURL(url){
        await this.page.goto(url)
    }

    async wait(timeOut){
        await this.page.waitForTimeOut(timeOut)
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