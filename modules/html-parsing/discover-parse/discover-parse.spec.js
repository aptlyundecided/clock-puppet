const fs = require('fs');
const expect = require('chai').expect;
const DiscoverParseHashtags = require('./index');
const UpdateJSON = require('../../data-management').Discover.UpdateDiscoverHashtags;

// Create function to read from test html file.
const readTestFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${__dirname}/mock-discover-html.html`,
            'utf-8',
            (err, data) => {
                if (err) {
                    reject({
                        msg: 'failed during readTestFile',
                        err
                    });
                } else {
                    resolve(data);
                }
            });
    });
}

// Test the Hashtag and Sound parsing from Discover Page.
describe('Discover Parse', () => {
   it('should extract hashtags from test html file', () => {
      return readTestFile()
          .then((html) => {
              return DiscoverParseHashtags(html);
          })
          .then((hashtagDatalist) => {
              expect(hashtagDatalist.length).to.equal(20);
              return UpdateJSON(hashtagDatalist);
          })
          .then(() => {
              console.log('whelp!')
          })
          .catch((e) => {
              console.log(e);
          })
   });
});
