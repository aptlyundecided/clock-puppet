const puppeteer = require('puppeteer');
const AutoScroller = require('./auto-scroller');
const DiscoverParseHashtags = require('./modules').HTMLParsing.DiscoverParse;
const Modules = require('./modules');

const VisitSites = Modules.Human.VisitSites;

const UpdateDiscoverHashtags = require('./modules').Data.Discover.UpdateDiscoverHashtags;

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

    // Sto hashtags in JSON file.
    await UpdateDiscoverHashtags(hashtags);

    // from the list of discover hashtags, visit each tag page.

    // from each tag page, visit 25 of the videos

    // from each video, record the hashtags into a new hashtag tree.
    // The hashtag tree should be just like the old one, except this time
    // each hashtag will have a ranked occurrence beside it.  Meaning that

    console.log(hashtags);
})();