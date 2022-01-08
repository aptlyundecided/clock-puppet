const puppeteer = require('puppeteer');
const GetRandomInt = require('../../util').GetRandomInt;
const Wait = require('../../util').Wait;
const SiteList = require('./site-list');

// Visit some sites prior to doing whatever the target work is to build up
// some cookies behaviors if for whatever reason that shit gets analyzed.
const VisitSites = async (page) => {
    const site1 = SiteList[GetRandomInt(0, SiteList.length)];
    const site2 = SiteList[GetRandomInt(0, SiteList.length)];
    const site3 = SiteList[GetRandomInt(0, SiteList.length)];

    await page.goto(site1);
    await Wait(1000);
    await page.goto(site2);
    await Wait(1000);
    await page.goto(site3);
    await Wait(1000);
};

module.exports = VisitSites;

