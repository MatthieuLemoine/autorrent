const { argv } = require('yargs');

// eslint-disable-next-line no-global-assign
require = require('@std/esm')(module, { cjs: true, esm: 'js' });

if (argv.add) {
  module.exports = require('./src/tvshow/add');
} else if (argv.remove) {
  module.exports = require('./src/tvshow/remove');
} else if (argv.getList) {
  module.exports = require('./src/tvshow/get-list');
} else if (argv.search) {
  module.exports = require('./src/search');
} else {
  module.exports = require('./src/index');
}
