const fs = require('fs');
const htmlParse = require('node-html-parser');

const readTestFile = () => {
    return new Promise((resolve, reject) => {
       fs.readFile(
       './mock-discover-html.html',
       'utf-8',
       (err, data) => {
                   if (err) {
                       reject({
                           msg: 'failed during readTestFile',
                           err: e
                       });
                   } else {
                       resolve(data);
                   }
       });
    });
}

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
readTestFile()
    .then((html) => {
        return basicParse(html);
    })
    .then((htmlObject) => {
        console.log(htmlObject);
        // Get all the items from the discover page
        const hmmm = htmlObject.querySelectorAll('._explore_feed_item')

        const hashtags = [];
        const sounds = [];

        hmmm.map((htmlItem) => {
            const w = htmlItem.querySelector('._card_header_link');
            const title = w.querySelector('._card_header_title').text;
            const subtitle = w.querySelector('._card_header_subTitle').text;
            console.log(title);
            console.log(subtitle);
            if (title.includes('#')) {
                hashtags.push({
                    tag: title,
                    views: subtitle
                });
            } else {
                sounds.push({
                    sound: title,
                    uhm: subtitle
                });
            }
        });


        console.log('why not?')
    })
    .catch((e) => {
        console.log(e);
    })