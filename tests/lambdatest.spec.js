//import { chromium, test, expect } from "@playwright/test"
const { chromium } = require('playwright')
const {expect} = require("expect");
const cp = require('child_process');

const parallelTests = async (capability) => {
  console.log('Initialising test:: ', capability['LT:Options']['name'])
  
  const browser = await chromium.connect({
    wsEndpoint: `ws://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
  })
  
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://ecommerce-playground.lambdatest.io/")
  await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]")
  // await page.click("text=Login")
  await page.click("'Login'")
  await page.fill("input[name='email']", "koushik350@gmail.com")
  await page.fill("input[name='password']", "Pass123$")
  await page.click("input[value='Login']");

  await page.close();
  await context.close();
  await browser.close();
  
  


}
// LambdaTest capabilities
const capabilities = [
  {
  browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: "latest",
  "LT:Options": {
      platform: "Windows 10",
      build: "Playwright Parallel Build",
      name: "Playwright Parallel Build",
      user: 'niyaz.hashmi',
      accessKey:'YU29ZEkmBT7faMAWMuNFDzdPBeTU88qwxVM9xAlIIv1RtRv4bu',
      network: false,
      video: true,
      console: true,
      tunnel: false, 
      tunnelName: "", 
      geoLocation: '', 
  }
  },
{
    browserName: 'MicrosoftEdge',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 8',
      build: 'Playwright Parallel Build',
      name: 'Playwright Parallel Test on Windows 8 - MicrosoftEdge',
      user: 'niyaz.hashmi',
      accessKey: 'YU29ZEkmBT7faMAWMuNFDzdPBeTU88qwxVM9xAlIIv1RtRv4bu',
      network: false,
      video: true,
      console: true,
      tunnel: false, 
      tunnelName: "", 
      geoLocation: '',
    }
  },
  {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'MacOS Big sur',
      build: 'Playwright Parallel Build',
      name: 'Playwright Parallel Test on MacOS Big sur - Chrome',
      user: 'niyaz.hashmi',
      accessKey: 'YU29ZEkmBT7faMAWMuNFDzdPBeTU88qwxVM9xAlIIv1RtRv4bu',
      network: false,
      video: true,
      console: true,
      tunnel: false, 
      tunnelName: "", 
      geoLocation: '',
    }
  }]

  capabilities.forEach(async (capability) => {
    await parallelTests(capability)

  })

  async function teardown(page, browser) {
    await page.close();
    await browser.close();
  }


