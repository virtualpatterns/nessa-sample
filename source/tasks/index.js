import 'babel-polyfill'
import Jake from 'jake'
import { Log } from '@virtualpatterns/mablung'

import Configuration from '../configuration'

Jake.addListener('start', () => {
  Jake.rmRf(Configuration.tasks.logPath, { 'silent': true })
  Log.createFormattedLog(Configuration.tasks.logPath)
  Log.debug('Jake.addListener(\'start\', () => { ... })')
})

desc('Remove built and bundled folders and files')
task('clean', [], { 'async': false }, () => {
  Jake.rmRf('distributables/server', { 'silent': true })
})

desc('Count the number of dirty files')
task('count', [], { 'async': true }, () => {
  Jake.exec([ 'bin/find-dirty-files' ], { 'printStderr': true, 'printStdout': true }, () => complete())
})

desc('Lint files')
task('lint', [], { 'async': true }, () => {
  Jake.exec([ 'eslint --ignore-path .gitignore --ignore-pattern source/configuration.js --ignore-pattern source/tasks source' ], { 'printStderr': true, 'printStdout': true }, () => complete())
})

desc('Build files')
task('build', [ 'clean', 'count', 'lint' ], { 'async': true }, () => {
  Jake.exec([ 'sandbox', 'server' ].map((folderName) => `babel source/${folderName} --copy-files --out-dir distributables/${folderName} --quiet --source-maps`), { 'printStderr': true, 'printStdout': true }, () => complete())
})

desc('Run server')
task('run', [ 'build' ], { 'async': true }, () => {

  Jake.rmRf(Configuration.server.logPath, { 'silent': true })

  Jake.exec([
    'clear',
    'node distributables/server/index.js'
  ], { 'printStderr': true, 'printStdout': true }, () => complete())

})

desc('Bundle files, watch for changes')
task('watch', [ 'lint' ], { 'async': true }, () => {

  Jake.rmRf(Configuration.babel.logPath, { 'silent': true })
  Jake.rmRf('distributables/www', { 'silent': true })

  Jake.exec([
    'clear',
    'parcel watch source/www/index.html --no-cache --out-dir distributables/www'
  ], { 'printStderr': true, 'printStdout': true }, () => complete())

})

Jake.addListener('complete', () => {
  Log.debug('Jake.addListener(\'complete\', () => { ... })')
})
