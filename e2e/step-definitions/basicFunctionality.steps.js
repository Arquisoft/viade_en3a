const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/basicFunctionality.feature');
const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');

jest.setTimeout(400000);
let page = null;

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

    test('Access the main view of the App', ({ given, when, then }) => {


        given('A new unregistered user', async () => {
            // Default case, already unregistered
        });

        when('Accessing the App', async () => {
            await page.waitForSelector('div[id="root"]'); // wait to load
        });

        then('The carousel loads', async () => {
            await page.waitForSelector('div[id="root"]');
            await expect(page).toMatchElement('div[id="root"]');

            await page.waitForSelector('div[id="container"]');
            await expect(page).toMatchElement('div[id="container"]');

            await page.waitForFunction('document.querySelector("body").innerText.includes("Bienvenido")');
        });
    });

    test('Change App Language', ({ given, when, then }) => {


        given('A user in the main view', async () => {
            await page.waitForSelector('div[id="root"]'); // wait to load
        });

        when('Pressing the change language button', async () => {
            await page.waitForSelector('[id="dropdown-item-button"]');
            await page.click('[id="dropdown-item-button"]');

            await page.waitForFunction('document.querySelector("body").innerText.includes("Inglés")');
            await page.click('button.dropdown-item');
        });

        then('Language should change', async () => {
            await page.waitForSelector('div[id="root"]');
            await page.waitForFunction('document.querySelector("body").innerText.includes("Welcome")');
        });
    });
});