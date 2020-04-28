const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/navigation.feature');
const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
//const a = require("../support/field");

jest.setTimeout(400000);
let idp = "https://uo263624.solid.community";
let account = "uo263624";
let page = null

function a(){
    return Buffer.from("SXo5X1NlVjRfJA==", "base64").toString('utf-8');
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

defineFeature(feature, (test) => {

    beforeEach(async () => {
        delay(10000);
        //Open browser
        const browser = await puppeteer.launch({
            //headless let watch the chrome window interacting with the application
            headless: false,
            defaultViewport: null
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');

        // Login
        await page.waitForSelector('button.btn-outline-light');
        await page.click('button.btn-outline-light');

        const [popup] = await Promise.all([
            new Promise((resolve) => {page.once('popup', resolve);}),
        ]);

        await popup.waitForSelector('input[type="url"]');
        await expect(popup).toFill('input[type="url"]', idp);
        await popup.click('[type="submit"]');

        await popup.waitForNavigation({
            waitUntil: 'networkidle2'
        });
        await popup.waitForSelector('input[id="username"]');
        await expect(popup).toFill('input[id="username"]', account);
        await expect(popup).toFill('input[id="password"]', a());
        await popup.click('[type="submit"]');
        await popup.waitForNavigation({
            waitUntil: 'networkidle2'
        });
        await page.waitForFunction('document.querySelector("body").innerText.includes("bienvenido")');
    });

    test('Access the route list correctly', ({ given, when, then }) => {


        given('A logged in user', async () => {
            // done
        });

        when('Navigating to my routes', async () => {
            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("a")];
                btns.forEach(async function (btn) {
                    if (btn.firstChild.innerText === "Gestión de rutas"){
                        btn.click();
                    }
                });
            });
            //await page.waitForSelector("button.nav-link");
            //await page.click("button.nav-link");
            await page.waitForSelector("[id=routeListNavButton]");
            await page.click("[id=routeListNavButton]");
        });

        then('He is at /routes/list', async () => {
            expect(page.url()).toBe("http://localhost:3000/#/routes/list");
        });
    });

    test('Access the route creation correctly', ({ given, when, then }) => {


        given('A logged in user', async () => {

        });

        when('Navigating to route creation', async () => {
            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("a")];
                btns.forEach(async function (btn) {
                    if (btn.firstChild.innerText === "Gestión de rutas"){
                        btn.click();
                    }
                });
            });
            await page.waitForSelector("[id=routeAddNavButton]");
            await page.click("[id=routeAddNavButton]");
        });

        then('He is at /routes/add', async () => {
            expect(page.url()).toBe("http://localhost:3000/#/routes/add");
        });
    });

    test('Access the route shared routes correctly', ({ given, when, then }) => {


        given('A logged in user', async () => {

        });

        when('Navigating to shared route', async () => {
            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("a")];
                btns.forEach(async function (btn) {
                    if (btn.firstChild.innerText === "Gestión de rutas"){
                        btn.click();
                    }
                });
            });
            await page.waitForSelector("[id=routeSharedNavButton]");
            await page.click("[id=routeSharedNavButton]");
        });

        then('He is at /routes/shared', async () => {
            expect(page.url()).toBe("http://localhost:3000/#/routes/shared");
        });
    });
});