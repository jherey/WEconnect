module.exports = {
  'Home page': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.visible('h1')
      .assert.containsText('h1', 'Connecting People, Connecting Businesses')
      .assert.visible('h2')
      .assert.containsText('h2', 'Latest Businesses')
      .assert.visible('footer')
      .assert.visible('p')
    browser.end();
  }
};
