const expect = require('chai').expect;
const ParseVideoSelection = require('./index');
const fs = require("fs");

// Create function to read from test html file.
const readTestFile = (filepath) => {
   return new Promise((resolve, reject) => {
      fs.readFile(
          filepath,
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

describe('Parse Video Selection', () => {
   it('should extract hashtag information from an html data set.', () => {
      return readTestFile(`${__dirname}/selected-tiktok.html`,)
          .then((html) => {
             return ParseVideoSelection(html);
          })
          .then((dataStruct) => {
             expect(typeof dataStruct.hashtags).to.equal('object');
             expect(Array.isArray(dataStruct.hashtags)).to.equal(true);
          })
          .catch((e) => {
             console.log(e);
          });
   });

   it('should gracefully abort when there is no video to scrape', () => {
      return readTestFile(`${__dirname}/mock-discover-html.html`,)
          .then((html) => {
             return ParseVideoSelection(html);
          })
          .then((dataStruct) => {
             expect(dataStruct).to.equal(null);
          })
          .catch((e) => {
             console.log(e);
          });
   });
});
