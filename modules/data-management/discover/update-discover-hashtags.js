const jsonfile = require('jsonfile');

const UpdateDiscoverHashtags = (hashtags) => {
    return new Promise((resolve, reject) => {
        if (!hashtags) {
            reject({msg: 'no new hashtags data provided'});
            return;
        }
        const jsonHashtags = JSON.stringify(hashtags);
        jsonfile.writeFile(`./data/discover-hashtags.json`, jsonHashtags, (err) => {
            if (!err) {
                resolve();
            } else {
                reject({
                    msg: 'failed during UpdateDiscoverHashtags',
                    err
                });
            }
        });
    });
};

module.exports = UpdateDiscoverHashtags;
