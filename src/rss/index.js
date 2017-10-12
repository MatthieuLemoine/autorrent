const FeedParser = require('feedparser');
const request = require('request');
const db = require('../db');

const FEED_URL = 'https://eztv.ag/ezrss.xml';
const feedParser = new FeedParser({ feedurl: FEED_URL });

module.exports = getNewTorrents;

function getNewTorrents() {
  const torrents = [];
  const lastPubDate = db.get('lastPubDate').value();
  return new Promise((resolve, reject) => {
    const req = request(FEED_URL);
    req.on('error', reject);
    req.on('response', (res) => {
      if (res.statusCode !== 200) {
        req.emit('error', new Error('Bad status code'));
      } else {
        req.pipe(feedParser);
      }
    });
    feedParser.on('error', reject);
    feedParser.on('readable', () => {
      let item = feedParser.read();
      while (item) {
        torrents.push({
          title: item.title,
          url: item.enclosures[0].url,
          pubDate: item.pubDate,
        });
        item = feedParser.read();
      }
    });
    feedParser.on('end', () => {
      const newPubDate = torrents[0].pubDate;
      resolve(torrents.filter(torrent => (lastPubDate ? torrent.pubDate > lastPubDate : true)));
      db.set('lastPubDate', newPubDate).write();
    });
  });
}
