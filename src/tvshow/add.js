import inquirer from 'inquirer';
import chalk from 'chalk';
import db from '../db';

(async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Tv show : ',
    },
  ]);
  if (!name) {
    return;
  }
  db
    .get('tvShows')
    .push(name)
    .write();
  console.log(chalk.green(`${name} added.`));
})();
