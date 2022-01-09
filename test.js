const puppeteer = require('puppeteer');
// const AutoScroller = require('./auto-scroller');
// const DiscoverParseHashtags = require('./modules').HTMLParsing.DiscoverParse;
const Modules = require('./modules');
const Wait = Modules.Util.Wait;
const GetRandomInt = Modules.Util.GetRandomInt;
const UpdateVideoData = Modules.Data.Videos.UpdateVideoData.UpdateVideoData;
// const VisitSites = Modules.Human.VisitSites;
//
// const UpdateDiscoverHashtags = require('./modules').Data.Discover.UpdateDiscoverHashtags;

const recursiveClicker = (page) => {
    return new Promise((resolve, reject) => {
        Wait(0)
            .then(() => {
                page.mouse.wheel({
                    deltaY: 100
                });

                return page.content();
            })
            .then((html) => {
                return UpdateVideoData(html);
            })
            .then(() => {
                const timeBetweenClicks = GetRandomInt(3, 5);
                const restTime = 3 * 1000;
                return Wait(restTime);
            })
            .then(() => {
                resolve(recursiveClicker(page))
            })
            .catch((e) => {
                reject({
                    msg: 'failed during recursiveClicker',
                    err: e
                });
            });
    });

}


(async () => {
    const browser = await puppeteer.connect({
        browserURL: 'http://127.0.0.1:9222'
    });


    // console.log('oh no');
    // console.log(pages);

    const page = await browser.newPage();
    // await VisitSites(page);
    // await page.goto('https://www.tiktok.com/discover');


// .video-card-browse
//<img src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web-aiso/tiktok/web/node/_next/static/images/arrow-d87dd7466edf4162275ad393d58d2f40.svg" class="jsx-441496149 control-icon arrow-right up-and-down">


    recursiveClicker(page)
        .catch((e) => {
            console.log(e);
        });
    // Scroll the entire Discover Page
    // await AutoScroller(page);

    // Retrieve the Discover Page HTML
    // const htmlContent = await page.content();

    // Retrieve The Discover Page Hashtags
    // const hashtags = await DiscoverParseHashtags(htmlContent);

    // Sto hashtags in JSON file.
    // await UpdateDiscoverHashtags(hashtags);

    // from the list of discover hashtags, visit each tag page.

    // from each tag page, visit 25 of the videos

    // from each video, record the hashtags into a new hashtag tree.
    // The hashtag tree should be just like the old one, except this time
    // each hashtag will have a ranked occurrence beside it.  Meaning that

    // console.log(hashtags);
})();