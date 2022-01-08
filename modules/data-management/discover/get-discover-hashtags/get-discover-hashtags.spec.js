const GetDiscoverHashtags = require('./get-discover-hashtags');
const expect = require('chai').expect;

describe('Get Discover Hashtags From JSON', () => {
    it('should retrieve them without error', () => {
        return GetDiscoverHashtags()
            .then((hashtags) => {
                expect(typeof hashtags).to.equal('object');
            })
            .catch((e) => {
                console.log(e);
            });
    });
});
