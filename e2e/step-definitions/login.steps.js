const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
//const podUtils = require('../../src/scripts/podUtils');
//const actions = require('../support/actions');
//const selectors = require('../support/selectors');

console.log("Start!");
jest.setTimeout(30000);

defineFeature((feature, test) => {

    beforeEach(async () => {
        console.log("Before each");
        jest.setTimeout(30000);
        await page.goto('http://localhost:3000/#/home')
    })

    test('Edit profile info', ({ given, when, then }) => {

        console.log("Test start")
        //jest.setTimeout(30000);

        /*beforeEach(async () => {
            console.log("Before each")
            await setTimeout(() => {alert("waited")}, 10000)
            await page.goto('http://localhost:3000/#/home');
        });*/


        given('An already registered user on the profile page', () => {

        });

        when('I click the edit profile button', async () => {
            //await expect(page).toClick('button', { text: 'Edit profile' , setTimeout: 30000})
        });

        then('The edit profile page appears', async () => {
            //await expect(page).toMatchElement('h1', { text: 'Edit profile info'})
        });
    });
});