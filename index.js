const { argv } = require('yargs');

// eslint-disable-next-line no-global-assign
require = require('@std/esm')(module, { cjs: true, esm: 'js' });

if (argv.add) {
  module.exports = require('./src/tvshow/add');
} else if (argv.remove) {
  module.exports = require('./src/tvshow/remove');
} else {
  module.exports = require('./src/index');
}
