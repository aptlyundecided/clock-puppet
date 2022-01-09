const fs = require('fs');
const htmlParse = require('node-html-parser');
const BasicParse = require('../basic-parse');

// Get the container which has the video information
const GetVideoInfoContainer = (html) => {
    return html.querySelector('.video-infos-container')
};

const GetCopyLink = (html) => {
    if (!html) { return null; }
    const copyLinkSection = html.querySelector('.copy-link-container');
    if (!copyLinkSection) { return null };
    const urlContainer = copyLinkSection.querySelector('.link-container');
    if (!urlContainer) { return null }
    const textNode = urlContainer.childNodes[0];
    const url = textNode.rawText;
    return url;
}

// Extract meta information in video title.
const GetTitleMeta = (videoContainer) => {
    try {
        const titleMeta = videoContainer.querySelector('.video-meta-title')
        return titleMeta;
    } catch {
        return null;
    }
};

const GetAllAnchors = (titleMeta) => {
    return titleMeta.querySelectorAll('a');
};

// The html structure has the real text data inside strong tags inside anchors.
const ExtractStrongs = (anchors) => {
    const strongs = [];

    anchors.map((item) => {
       strongs.push(item.querySelector('strong'));
    });
    
    return strongs;
}

// Carry out complete video HTML parse operation
const ParseSelectedVideo = (html) => {
    const meta = {
        url: ''
    };
    return new Promise((resolve, reject) => {
        BasicParse(html)
            .then((parsedHTML) => {
                if (!parsedHTML) { return null; }
                const url = GetCopyLink(parsedHTML);
                if (!url) { return null; }
                meta.url = url;
                return GetVideoInfoContainer(parsedHTML);
            })
            .then((FeedItems) => {
                if (!FeedItems) { return null; }
                return GetTitleMeta(FeedItems);
            })
            .then((FeedItems) => {
                if (!FeedItems) { return null; }
                return GetAllAnchors(FeedItems);
            })
            .then((anchorList) => {
                if (!anchorList) { return null; }
                // TODO [refactor] should create a struct not a list.
                return ExtractStrongs(anchorList);
            })
            .then((strongList) => {
                if (!strongList) { return null; }
                // TODO [refactor] should receive a struct not a list.
                const hashtagList = [];

                strongList.map((item) => {
                    const textNode = item.childNodes[0];
                    const text = textNode.rawText;
                    if (text.includes('#')) {
                        hashtagList.push(text);
                    }
                });

                return {
                    meta,
                    hashtags: hashtagList
                };
            })
            .then((scrapeStruct) => {
                resolve(scrapeStruct);
            })
            .catch((e) => {
                reject({
                    msg: 'failed during GetDiscoverHashtags'
                });
            });
    });
};

module.exports = ParseSelectedVideo;
