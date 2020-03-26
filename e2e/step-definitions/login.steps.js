const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
const podUtils = require('../../src/scripts/podUtils');
var assert = require('assert');

/*
const credentials = {
    "idp": "https://solid.community",
    "username": "",
    "password": ""
}*/
const credentials = {
    "idp"      : "https://solid.community",
    "username" : "viadeen3a",                  
    "password" : "viadeen3atest123"
};
defineFeature(feature, test => {
    
    beforeEach(async () => {
        await page.goto('http://localhost:3000')
    })

    test('The user is registered in the site', ({ given, when, then }) => {
    
        given('An already registered user', async () => {
           /* let dummy = podUtils.getValidCredentials();
            credentials.idp=dummy.idp;
            credentials.username = dummy.username;
            credentials.password = dummy.password;*/
            await podUtils.login(credentials), true;
        });
    
        when('I click the sign in button and access with my credentials', async () => {
          await podUtils.login(credentials);
        });
    
        then('A welcome message should be shown in the screen with my name', async () => {
          await expect(page).toMatchElement('h1', { text: 'Hi '+ credentials.username + ','})
        });
      });
})