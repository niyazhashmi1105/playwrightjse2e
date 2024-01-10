export class LoginPage{

    constructor(page){
        this.page = page
        this.userName = "#user-name"
        this.password = "#password"
        this.loginBtn = "#login-button"
    }

    async navigateToLoginPage(url){
        this.page.goto(url)
    }
    async doLogin(user, pass){
        await this.page.fill(this.userName,user)
        await this.page.fill(this.password, pass)
        await this.page.locator(this.loginBtn).click()
    }
}