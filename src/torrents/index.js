import FeedParser from 'feedparser';
import request from 'request';
import parseTorrent from 'parse-torrent-name';
import db from '../db';

const FEED_URL = 'https://eztv.ag/ezrss.xml';
const feedParser = new FeedParser({ feedurl: FEED_URL });

export default getTorrents;

async function getTorrents() {
  // Tv shows that we are following
  const tvShows = db.get('tvShows').value();
  // Video resolutions
  const resolutions = db.get('resolutions').value();
  // Alrady downloaded torrents
  const torrents = db.get('torrents');
  // New torrents since last run
  const recentTorrents = await getRecentTorrents();
  // Torrents that we may be interested in
  const followedTorrents = recentTorrents.filter(
    torrent => tvShows.includes(torrent.title) && resolutions.includes(torrent.resolution),
  );
  // Remove already downloaded
  const newTorrents = followedTorrents.filter(
    torrent =>
      !torrents
        .find({ title: torrent.title, episode: torrent.episode, season: torrent.season })
        .value(),
  );
  // Store torrents
  newTorrents.forEach(torrent =>
    db
      .get('torrents')
      .push(torrent)
      .write(),
  );
  return newTorrents;
}

function getRecentTorrents() {
  const torrents = [];
  const lastPubDate = new Date(db.get('lastPubDate').value());
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
          ...parseTorrent(item.title),
          url: item.enclosures[0].url,
          pubDate: item.pubDate,
        });
        item = feedParser.read();
      }
    });
    feedParser.on('end', () => {
      const newPubDate = torrents[0].pubDate;
      db.set('lastPubDate', newPubDate).write();
      resolve(torrents.filter(torrent => (lastPubDate ? torrent.pubDate > lastPubDate : true)));
    });
  });
}
