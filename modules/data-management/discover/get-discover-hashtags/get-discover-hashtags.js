const jsonfile = require('jsonfile');

const GetDiscoverHashtags = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(`./data/discover-hashtags.json`, (err, data) => {
            if (!err) {
                resolve(JSON.parse(data));
            } else {
                reject({
                    msg: 'failed during UpdateDiscoverHashtags',
                    err
                });
            }
        });
    });
};

module.exports = GetDiscoverHashtags;
