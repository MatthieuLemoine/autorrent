import chalk from 'chalk';
import Enquirer from 'enquirer';
import promptList from 'prompt-list';
import db from '../db';

const enquirer = new Enquirer();
enquirer.register('list', promptList);

const questions = [
  {
    type: 'list',
    name: 'name',
    message: 'Pick a tvshow to remove : ',
    choices: db.get('tvShows').value(),
  },
];

(async () => {
  const { name } = await enquirer.ask(questions);
  if (!name) {
    return;
  }
  db
    .set(
      'tvShows',
      db
        .get('tvShows')
        .value()
        .filter(item => item !== name),
    )
    .write();
  console.log(chalk.green(`${name} removed.`));
})();
