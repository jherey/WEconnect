// const path = require('path');
const userInfo = require('../mocks/userDetails');

module.exports = {
  'Users should not signup with incomplete details': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=lastname]', userInfo.lastname)
      .setValue('input[name=username]', userInfo.username)
      .setValue('input[name=email]', userInfo.email)
      .setValue('input[name=password]', userInfo.password)
      .setValue('input[name=confirmPassword]', userInfo.confirmPassword)
      .setValue('select[name=sex]', userInfo.sex)
      .waitForElementVisible('#signup', 5000)
      .click('button#signup')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Firstname is required')
      .pause(2000);
  },

  'Users can signup': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=firstname]', userInfo.firstname)
      .setValue('input[name=lastname]', userInfo.lastname)
      .setValue('input[name=username]', userInfo.username)
      .setValue('input[name=email]', userInfo.email)
      .setValue('input[name=password]', userInfo.password)
      .setValue('input[name=confirmPassword]', userInfo.confirmPassword)
      .setValue('select[name=sex]', userInfo.sex)
      .waitForElementVisible('#signup', 5000)
      .click('button#signup')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Welcome jherey! Signed up successfully!')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .pause(5000);
  },

  'Users should not login with incomplete details': (browser) => {
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=password]', userInfo.password)
      .click('button#signup')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Username is required')
      .pause(2000);
  },

  'Users should login with correct details': (browser) => {
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userInfo.username)
      .setValue('input[name=password]', userInfo.password)
      .click('button#signup')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Welcome jherey! Signed in successfully!')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .pause(2000);
  },

  'Users should be able to edit their profile': (browser) => {
    browser
      .url('http://localhost:8000/dashboard')
      .waitForElementVisible('body', 5000)
      .click('button#editProfile')
      .pause(2000)
      .clearValue('input[name=firstname]')
      .pause(500)
      .clearValue('input[name=lastname]')
      .pause(500)
      .setValue('input[name=firstname]', userInfo.editedFirstName)
      .setValue('input[name=lastname]', userInfo.editedLastName)
      .click('button.editProfile')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Update successful!')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .pause(2000);
  },

  'Users should be not register a business with incomplete details': (browser) => {
    browser
      .url('http://localhost:8000/register')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=businessName]', userInfo.businessName)
      .setValue('textarea[name=businessInfo]', userInfo.businessInfo)
      .setValue('input[name=website]', userInfo.website)
      .setValue('input[name=email]', userInfo.businessEmail)
      .setValue('input[name=address]', userInfo.address)
      .setValue('select[name=location]', userInfo.location)
      .click('button#signup')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Category is required')
      .pause(2000);
  },

  'Users should be able to register a business': (browser) => {
    browser
      .url('http://localhost:8000/register')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=businessName]', userInfo.businessName)
      .setValue('textarea[name=businessInfo]', userInfo.businessInfo)
      .setValue('input[name=website]', userInfo.website)
      .setValue('input[name=email]', userInfo.businessEmail)
      .setValue('select[name=category]', userInfo.category)
      .setValue('input[name=address]', userInfo.address)
      .setValue('select[name=location]', userInfo.location)
      .click('button#signup')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Business registered successfully')
      .pause(3000);
  },

  'Users should not see any business if type is not selected': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=keyword]', userInfo.businessName)
      .click('button#search')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Please type a search query and select a type')
      .pause(2000);
  },

  'Users should be able to search for a business': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=keyword]', userInfo.businessName)
      .setValue('select[name=type]', userInfo.type)
      .click('button#search')
      .waitForElementVisible('h3', 5000)
      .assert.urlEquals('http://localhost:8000/search')
      .pause(2000);
  },

  'Users should not post a review for a business if no rating': (browser) => {
    browser
      .url('http://localhost:8000/1')
      .waitForElementVisible('body', 5000)
      .setValue('textarea[name=review]', userInfo.businessName)
      .click('button#postReview')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Please type a review and give a rating')
      .pause(2000);
  },

  'Users should be able to edit their businesses': (browser) => {
    browser
      .url('http://localhost:8000/1')
      .waitForElementVisible('body', 5000)
      .pause(3000)
      .click('#editBusiness')
      .pause(3000)
      .assert.urlEquals('http://localhost:8000/1/edit')
      .clearValue('input[name=businessName]')
      .pause(500)
      .setValue('input[name=businessName]', userInfo.editedBusinessName)
      .click('button#signup')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Business updated successfully!')
      .pause(2000);
  },

  'Users should be able to delete a business': (browser) => {
    browser
      .assert.visible('#deleteBusiness')
      .pause(3000)
      .click('#deleteBusiness')
      .pause(2000)
      .click('#delete')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Business deleted')
      .assert.urlEquals('http://localhost:8000/')
      .pause(2000)
      .end();
  },
};
