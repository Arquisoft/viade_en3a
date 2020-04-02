const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
//const podUtils = require('../../src/scripts/podUtils');
const actions = require('../support/actions');
const selectors = require('../support/selectors');

defineFeature(feature, test => {

    test('Edit profile info', ({ given, when, then }) => {
    
        jest.setTimeout(30000);

        beforeEach(async () => {
            await page.goto('http://localhost:3000/#/profile');
          })
        

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