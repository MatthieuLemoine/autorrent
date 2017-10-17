import chalk from 'chalk';
import Enquirer from 'enquirer';
import autocomplete from 'prompt-autocompletion';
import searchTvShows from '../tvshow/search';
import db from '../db';

const enquirer = new Enquirer();
enquirer.register('autocomplete', autocomplete);

const questions = [
  {
    type: 'autocomplete',
    name: 'name',
    message: 'Select a tv show : ',
    source: searchTvShows,
  },
];

(async () => {
  const { name } = await enquirer.ask(questions);
  if (!name) {
    return;
  }
  db
    .get('tvShows')
    .push(name)
    .write();
  console.log(chalk.green(`${name} added.`));
})();
