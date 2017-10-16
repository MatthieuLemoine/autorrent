import inquirer from 'inquirer';
import chalk from 'chalk';
import db from '../db';

(async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Pick a tvshow to remove : ',
      choices: db.get('tvShows').value(),
    },
  ]);
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
