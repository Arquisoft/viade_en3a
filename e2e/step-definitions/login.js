const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
//const podUtils = require('../../src/scripts/podUtils');
//const actions = require('../support/actions');
//const selectors = require('../support/selectors');

console.log("Start!");
jest.setTimeout(400000);

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

defineFeature(feature, test => {

    beforeEach(async () => {
        /*delay(10000);
        console.log("Before each");
        //Open browser
        const browser = await puppeteer.launch({
            //headless let watch the chrome window interacting with the application
            headless: false,
            defaultViewport: null
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/viade_en3a#/routes/add');
*/

        // Log in

    })

    test('Edit profile info', ({ given, when, then }) => {

        console.log("Test start")
        //jest.setTimeout(30000);

        given('An already registered user on the profile page', async () => {
            delay(10000);
            await page.goto('http://localhost:3000/viade_en3a#/routes/add');
            delay(20000);
            console.log("post Delay");
            await expect(page).toFill('input[id="routeNameInput"]', "Ruta Cucumber-Puppeteer");
            await page.click('//*[@id="responsive-navbar-nav"]/div[1]/div[1]/a');

            await page.waitForSelector('#profileNavButton');
            await page.click('#profileNavButton');
        });

        when('I click the edit profile button', async () => {
            //await expect(page).toClick('button', { text: 'Edit profile' , setTimeout: 30000})
        });

        then('The edit profile page appears', async () => {
            //await expect(page).toMatchElement('h1', { text: 'Edit profile info'})
        });
    });
});