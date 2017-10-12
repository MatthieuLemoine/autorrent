const getNewTorrents = require('./rss');

(async () => {
  const torrents = await getNewTorrents();
  console.log(torrents);
})();
