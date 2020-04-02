// These are ways of being able to identify HTML elements to interact with and check.
const selectors = {
  links: {
    Signup: 'a[href="/signup"]',
    Login: 'a[href="/login"]',
  },
  buttons: {
    EditProfile: 'button'
  }
};

module.exports = selectors;
