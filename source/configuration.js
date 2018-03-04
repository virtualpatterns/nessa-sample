import { Path, Process } from '@virtualpatterns/mablung'

const PORT = 8080

export default {

  'babel': {
    'logPath': `./process/logs/nessa-sample-babel.log`
  },

  'bundle': {
    'entryPath': Path.join(__dirname, '../source/www/index.html'),
    'options': {
      'cache': false,
      'detailedReport': false,
      'https': false,
      'logLevel': 3,
      'minify': false,
      'outDir': Path.join(__dirname, '../distributables/www'),
      'outFile': Path.join(__dirname, '../distributables/www/index.html'),
      'sourceMaps': true,
      'target': 'browser',
      'watch': false
    }
  },

  'server': {
    'address': '0.0.0.0',
    'logPath': `./process/logs/nessa-sample-server.log`,
    'port': PORT,
    'secondsToNanoseconds': 1e9,
    'secondsToMilliseconds': 1e3,
    'nanosecondsToMilliseconds': 1e-6
  },

  'tasks': {
    'logPath': `./process/logs/nessa-sample-tasks.log`
  }

}
