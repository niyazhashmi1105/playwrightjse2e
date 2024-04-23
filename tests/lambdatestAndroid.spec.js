import { _andriod, test } from "@playwright/test";
const {_android} = require("playwright");
//const expect = require("chai");

(async () => {
    const capabilities = {
        "LT:Options": {
            platformName: "android",
            deviceName: "Pixel 5",
            platformVersion: "11",
            isRealMobile: true,
            build: "Playwright android build",
            name: "Playwright android test",
            user: 'niyaz.hashmi',
            accessKey: 'YU29ZEkmBT7faMAWMuNFDzdPBeTU88qwxVM9xAlIIv1RtRv4bu',
            network: true,
            video: true,
            console: true,
            projectName: "Test Andriod Project",
        },
    };

    test("Lambdatest Mobile Emulation", async()=>{
    let device = await _android.connect(
        `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities))}`,
    );

    console.log(`Model:: ${device.model()}, serial:: ${device.serial()}`);

    await device.shell("am force-stop com.android.chrome");

    let context = await device.launchBrowser();
    let page = await context.newPage();

    await page.goto("https://duckduckgo.com");
    let element = await page.$("[name=\"q\"]");
    await element.click();
    await element.type("Playwright");
    await element.press("Enter");
    let title = await page.title();

    try {
        expect(title).to.equal("Playwright at DuckDuckGo");
        // Mark the test as completed or failed
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed" },})}`);
    } catch (e) {
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.stack }})}`);
        console.log("Error:: ", e.stack);
    }

    await page.close();
    await context.close();
    await device.close();
})();
})