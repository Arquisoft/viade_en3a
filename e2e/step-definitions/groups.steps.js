const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/groups.feature');
const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
//const a = require("../support/field");

jest.setTimeout(400000);
let idp = "https://uo263624.solid.community";
let account = "uo263624";
let page = null;

function a(){
    //return "viadeen3atest123";
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

    test('Create a group', ({ given, when, then }) => {


        given('An already registered user at groups view', async () => {
            // logged in done
            // move to correct view
            await page.goto('http://localhost:3000/#/groups');
            await page.waitForFunction('document.querySelector("body").innerText.includes("pos de amig")');
        });

        when('Creating a group', async () => {
            await page.waitForSelector("[id=btnCreateGroup]");
            await page.click('a[id="btnCreateGroup"]');

            // wait for the cards to load
            await delay(1000);
            await page.waitForSelector("div.card");
            await page.click('button.btn-success');

            // Wait for correctly added popup
            await page.waitForFunction('document.querySelector("body").innerText.includes("adido correct")');

            // name and submit
            await expect(page).toFill('input', "My cucumber group");
            await page.click('button[id="btnCreate"]');
        });

        then('The group is created', async () => {
            await page.waitForSelector("div.card-body");
            await page.waitForFunction('document.querySelector("div").innerText.includes("My cucumber group")');
        });
    });

    test('Create a group with no people', ({ given, when, then }) => {


        given('An already registered user at groups view', async () => {
            // logged in done
            // move to correct view
            await page.goto('http://localhost:3000/#/groups');
            await page.waitForFunction('document.querySelector("body").innerText.includes("pos de amig")');
        });

        when('Creating a group without adding people', async () => {
            await page.waitForSelector("[id=btnCreateGroup]");
            await page.click('a[id="btnCreateGroup"]');

            // wait for the cards to load
            await delay(1000);
            await page.waitForSelector("div.card");

            // name and submit
            await expect(page).toFill('input', "My cucumber group");
            await page.click('button[id="btnCreate"]');
        });

        then('A popup appears', async () => {
            await page.waitForFunction('document.querySelector("div").innerText.includes("menos un miembro")');
        });
    });

    test('Create a group with no name', ({ given, when, then }) => {


        given('An already registered user at groups view', async () => {
            // logged in done
            // move to correct view
            await page.goto('http://localhost:3000/#/groups');
            await page.waitForFunction('document.querySelector("body").innerText.includes("pos de amig")');
        });

        when('Creating a group without setting a name', async () => {
            await page.waitForSelector("[id=btnCreateGroup]");
            await page.click('a[id="btnCreateGroup"]');

            // wait for the cards to load
            await delay(1000);
            await page.waitForSelector("div.card");
            await page.click('button.btn-success');

            // Wait for correctly added popup
            await page.waitForFunction('document.querySelector("body").innerText.includes("adido correct")');

            // submit
            await page.click('button[id="btnCreate"]');
        });

        then('A popup appears', async () => {
            await page.waitForFunction('document.querySelector("div").innerText.includes("nombre no puede estar")');
        });
    });
});