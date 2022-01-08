const fs = require('fs');
const htmlParse = require('node-html-parser');


const basicParse = (html) => {
    return new Promise((resolve, reject) => {
        try {
            const root = htmlParse.parse(html);
            resolve(root);
        } catch {
            reject({
                msg: 'failed during basicParse'
            });
        }
    });
};

// Extract Feed Items from Discover page by class name.
const GetAllFeedItems = (html) => {
    return html.querySelectorAll('._explore_feed_item')
}

// Extract the hashtags + their number of views from the html elements
const ExtractHashtags = (FeedItemElement) => {
    const hashtags = [];

    FeedItemElement.map((htmlItem) => {
        const w = htmlItem.querySelector('._card_header_link');
        const title = w.querySelector('._card_header_title').text;
        const subtitle = w.querySelector('._card_header_subTitle').text;
        if (title.includes('#')) {
            hashtags.push({
                tag: title,
                views: subtitle
            });
        }
    });

    return hashtags;
}

const GetDiscoverHashtags = (html) => {
    return new Promise((resolve, reject) => {
        basicParse(html)
            .then((parsedHTML) => {
                return GetAllFeedItems(parsedHTML);
            })
            .then((FeedItems) => {
                return ExtractHashtags(FeedItems);
            })
            .then((hashtagsStruct) => {
                resolve(hashtagsStruct);
            })
            .catch((e) => {
                reject({
                    msg: 'failed during GetDiscoverHashtags'
                });
            });
    });
};




module.exports = GetDiscoverHashtags;
