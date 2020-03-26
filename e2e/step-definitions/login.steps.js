const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
const podUtils = require('../../src/scripts/podUtils');


defineFeature(feature, test => {

    test('The user is registered in the site', ({ given, when, then }) => {
    
        given('An already registered user', () => {
            
        });
    
        when('I click the sign in button and access with my credentials', async () => {
            this.timeout(2000);
            await podUtils.login();
        });
    
        then('A welcome message should be shown in the screen with my name', async () => {
            await page.goto('http://localhost:3000/viade_en3a#/');
            await expect(page).toMatchElement('h1', { text: 'Hi '+ credentials.username + ','})
        });
    });
})