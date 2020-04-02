// Dependencies
const pages = require('./pages');
const selectors = require('./selectors');
const scope = require('./scope');

// Defines whether puppeteer runs Chrome in headless mode.
let headless = true;
let slowMo = 0;
// Chrome is set to run headlessly and with no slowdown in CircleCI
if (process.env.CIRCLECI) headless = true;
if (process.env.CIRCLECI) slowMo = 0;

const pending = callback => {
  callback(null, 'pending');
};

const visitHomepage = async () => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({ headless, slowMo });
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
  const url = scope.host + pages.home;
  const visit = await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2'
  });
  return visit;
};

const clickOnItem = async link => {
  const { currentPage } = scope.context;
  return await currentPage.click(selectors.links[link]);
};

const takenToPage = async pageName => {
  const url = scope.host + pages[pageName];
  const urlMatched = scope.context.currentPage.waitForFunction(
    `window.location.href === '${url}'`,
    { mutation: true }
  );
  await urlMatched;
};

const pressButton = async button => {
  const { currentPage } = scope.context;
  return await currentPage.click(selectors.buttons[button]);
};

const wait = async timeInSeconds => {
  const time = parseInt(timeInSeconds) * 1000;
  await delay(time);
};


module.exports = {
  pending,
  headless,
  visitHomepage,
  clickOnItem,
  takenToPage,
  pressButton,
  wait
};
