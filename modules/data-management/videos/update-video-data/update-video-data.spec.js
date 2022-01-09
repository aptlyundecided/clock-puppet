const jsonfile = require('jsonfile');
const UpdateVideoData = require('./index').UpdateVideoData;
const fs = require("fs");
// const ParseVideoSelection = require("../../../html-parsing/video-selection");
const { expect } = require("chai");

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
                return UpdateVideoData(html);
            })
            .then((dataStruct) => {
                expect(typeof dataStruct.hashtags).to.equal('object');
                expect(Array.isArray(dataStruct.hashtags)).to.equal(true);
            })
            .catch((e) => {
                console.log(e);
            });
    });

});
