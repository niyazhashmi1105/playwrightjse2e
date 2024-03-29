const base = require('@playwright/test');
const LoginPage = require('../pages/loginpage');

const test = base.test.extend({
        loginPage: async({page}, use)=>{
            const loginPage = new LoginPage(page);
            await use(loginPage);
        },
})
exports.expect = base.expect;