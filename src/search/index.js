import Enquirer from 'enquirer';
import autocomplete from 'prompt-autocompletion';
import searchTvShows from '../tvshow/search';

const enquirer = new Enquirer();
enquirer.register('autocomplete', autocomplete);

const questions = [
  {
    type: 'autocomplete',
    name: 'title',
    message: 'Select a tv show : ',
    source: searchTvShows,
  },
  {
    type: 'input',
    name: 'season',
    message: 'Season number : ',
  },
  {
    type: 'input',
    name: 'episode',
    message: 'Episode (all & ranges e.g 5-8 supported) : ',
  },
];

(async () => {
  try {
    const answers = await enquirer.ask(questions);
    console.log(answers);
  } catch (e) {
    console.error(e);
  }
})();
