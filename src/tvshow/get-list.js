import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import chalk from 'chalk';
import request from 'request-promise';

const URL = 'https://eztv.ag/js/search_shows1.js';
const regex = /"text":"(.*?)"/g;

(async () => {
  try {
    const tvShows = await getTvShows();
    await promisify(fs.writeFile)(
      path.join(__dirname, 'tvShows.json'),
      JSON.stringify({ tvShows }, null, 2),
    );
    console.log(chalk.green(`${tvShows.length} tv shows found and persisted.`));
  } catch (e) {
    console.error(e);
  }
})();

async function getTvShows() {
  const data = await request(URL);
  const tvShows = data.match(regex).map(e => e.replace(regex, '$1'));
  return tvShows;
}
