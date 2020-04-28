const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/routes.feature');
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

    test('Create a route', ({ given, when, then }) => {


        given('An already registered user at route creation view', async () => {
            // logged in done
            // move to correct view
            await page.goto('http://localhost:3000/#/routes/add');
            await page.waitForSelector("[id=routeNameInput]");
        });

        when('Creating a route', async () => {
            await page.waitForSelector("[id=routeNameInput]");
            await expect(page).toFill('[id="routeNameInput"]', "Cucumber test Route");
            await expect(page).toFill('textarea', "Description of the route Route");
            await delay(300);

            // Point 1
            await page.mouse.move(100, 650);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            // Point 2
            await page.mouse.move(100, 700);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            // Point 3
            await page.mouse.move(200, 700);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            //Point 4
            await page.mouse.move(200, 650);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            /* Depending on resolution, and scrren, at least some of the points will render */

            await page.click('button[id="btnSave"]');
        });

        then('The route is created', async () => {
            await page.waitForFunction('document.querySelector("body").innerText.includes("Lista de ")');
            await page.waitForFunction('document.querySelector("div").innerText.includes("Cucumber")');
        });
    });

    test('Error popup when no title', ({ given, when, then }) => {


        given('An already registered user at route creation view', async () => {
            // logged in done
            // move to correct view
            await page.goto('http://localhost:3000/#/routes/add');
            await page.waitForSelector("[id=routeNameInput]");
        });

        when('Creating a route with no title', async () => {
            await page.waitForSelector("textarea");
            await expect(page).toFill('textarea', "Description of the route Route");
            await delay(300);

            // Point 1
            await page.mouse.move(100, 650);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            // Point 2
            await page.mouse.move(100, 700);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            // Point 3
            await page.mouse.move(200, 700);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            //Point 4
            await page.mouse.move(200, 650);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            /* Depending on resolution, and scrren, at least some of the points will render */

            await page.click('button[id="btnSave"]');
        });

        then('The route is not created and a popup appears', async () => {
            await page.waitForSelector("textarea");
            await page.waitForFunction('document.querySelector("div").innerText.includes("no puede estar vac")');
        });
    });

    test('Error popup when no points', ({ given, when, then }) => {


        given('An already registered user at route creation view', async () => {
            // logged in done
            // move to correct view
            await page.goto('http://localhost:3000/#/routes/add');
            await page.waitForSelector("[id=routeNameInput]");
        });

        when('Creating a route with no points', async () => {
            await page.waitForSelector("[id=routeNameInput]");
            await expect(page).toFill('[id="routeNameInput"]', "Cucumber test Route");
            await expect(page).toFill('textarea', "Description of the route Route");
            await page.click('button[id="btnSave"]');
        });

        then('The route is not created and a popup appears', async () => {
            await page.waitForSelector("textarea");
            await page.waitForFunction('document.querySelector("body").innerText.includes("contener al menos dos")');
        });
    });

    test('Error popups with no data at all', ({ given, when, then }) => {


        given('An already registered user at route creation view', async () => {
            // logged in done
            // move to correct view
            await page.goto('http://localhost:3000/#/routes/add');
            await page.waitForSelector("[id=routeNameInput]");
        });

        when('Creating a route with no data', async () => {
            await page.waitForSelector("[id=routeNameInput]");
            await page.click('button[id="btnSave"]');
        });

        then('The route is not created and two popups appear', async () => {
            await page.waitForSelector("textarea");
            await page.waitForFunction('document.querySelector("div").innerText.includes("no puede estar vac")');
            await page.waitForFunction('document.querySelector("body").innerText.includes("contener al menos dos")');
        });
    });
});