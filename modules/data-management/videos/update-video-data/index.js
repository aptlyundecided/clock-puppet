const jsonfile = require('jsonfile');
const ParseVideoData = require('../../../html-parsing/video-selection');
const GetVideoStructs = require('../get-video-data');

const UpdateVideoData = (html) => {
    return new Promise((resolve, reject) => {
        let parsedStruct = {};
        ParseVideoData(html)
            .then((result) => {
                if (!result) { return null; }
                parsedStruct = result;
                return GetVideoStructs();
            })
            .then((existingStruct) => {
                if (!existingStruct) { return null; }
                const newStruct = Object.assign({}, existingStruct);
                newStruct[parsedStruct.meta.url] = parsedStruct;
                return newStruct;
            })
            .then((newStruct) => {
                if (!newStruct) { return null; }
                const jsonStruct = JSON.stringify(newStruct);
                jsonfile.writeFile('./data/video-data-structs.json', jsonStruct, (err) => {
                   if (err) {
                       reject({
                           msg: 'failed during JSON write',
                           err
                       });
                   } else {
                       resolve();
                   }
                });
            })
            .catch((e) => {
                reject({
                    msg: 'failed during UpdateVideoData',
                    err: e
                });
            });
    });
};

module.exports = {
    UpdateVideoData
};
