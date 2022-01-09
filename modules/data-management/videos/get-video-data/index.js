const jsonfile = require('jsonfile');

const GetVideoStructs = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(`./data/video-data-structs.json`, (err, data) => {
            if (!err) {
                if (typeof data === 'string') {
                    const d = JSON.parse(data);
                    resolve(d);
                } else {
                    resolve(data);
                }
            } else {
                reject({
                    msg: 'failed during UpdateDiscoverHashtags',
                    err
                });
            }
        });
    });
};

module.exports = GetVideoStructs;
