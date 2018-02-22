import { Process } from '@virtualpatterns/mablung'

const PORT = 8080

export default {

  'babel': {
    'logPath': `./process/logs/nessa-sample-babel.log`
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
