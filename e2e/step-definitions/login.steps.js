const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
//import a from "../support/field";

jest.setTimeout(400000);
let idp = "https://uo263624.solid.community";
let account = "uo263624";
let page = null;

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
        await delay(10000);
        //Open browser
        const browser = await puppeteer.launch({
            //headless let watch the chrome window interacting with the application
            headless: false,
            defaultViewport: null
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    test('Login to an account', ({ given, when, then }) => {


        given('An unlogged user with account', async () => {
            // Default case, already unregistered
        });

        when('I click Log in', async () => {
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
        });

        then('I should be logged in', async () => {
            await page.waitForFunction('document.querySelector("body").innerText.includes("bienvenido")');
            await page.waitForFunction('document.querySelector("body").innerText.includes("Cerrar sesión")');
        });
    });
});