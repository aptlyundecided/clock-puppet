const htmlParse = require('node-html-parser');

const BasicParse = (html) => {
    return new Promise((resolve, reject) => {
        try {
            const root = htmlParse.parse(html);
            resolve(root);
        } catch {
            reject({
                msg: 'failed during BasicParse'
            });
        }
    });
};

module.exports = BasicParse;
