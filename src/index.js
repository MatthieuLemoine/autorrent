import chalk from 'chalk';
import getTorrents from './torrents';
import uploadTorrents from './upload';

(async () => {
  try {
    const torrents = await getTorrents();
    await uploadTorrents(torrents);
    if (torrents.length) {
      console.log(
        chalk.green(`The following ${torrents.length} torrents have been sent to the seedbox :`),
      );
      torrents.forEach(torrent =>
        console.log(`  • ${torrent.title} : Season ${torrent.episode} Episode ${torrent.episode}`),
      );
    } else {
      console.log(chalk.blue('No new torrent sent to the seedbox'));
    }
  } catch (e) {
    console.error(e);
  }
})();
