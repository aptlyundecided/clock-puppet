const puppeteer = require('puppeteer');
const AutoScroller = require('./auto-scroller');
const DiscoverParseHashtags = require('./modules').HTMLParsing.DiscoverParse;
const Modules = require('./modules');

const VisitSites = Modules.Human.VisitSites;

(async () => {
    const browser = await puppeteer.connect({
        browserURL: 'http://127.0.0.1:9222'
    });

    const page = await browser.newPage();
    await VisitSites(page);
    await page.goto('https://www.tiktok.com/discover');

    // Scroll the entire Discover Page
    await AutoScroller(page);

    // Retrieve the Discover Page HTML
    const htmlContent = await page.content();

    // Retrieve The Discover Page Hashtags
    const hashtags = await DiscoverParseHashtags(htmlContent);

    console.log(hashtags);
})();