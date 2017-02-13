import { FileSystem, Path } from 'mablung'
import WebPack from 'webpack'

import Package from './package'

const LOG_PATH = Path.join(__dirname, 'process', 'logs', `${Package.name}.webpack.log`)

FileSystem.mkdirp.sync(Path.dirname(LOG_PATH))

module.exports = {
  'devtool': 'source-map',
  'entry': {
    'index': [
      Path.join(__dirname, 'www', 'scripts', 'index.js')
    ]
  },
  'module': {
    'loaders': [
      // {
      //   'test': /\.pug$/,
      //   'loader': 'nessa/library/loader'
      // }
    ]
  },
  'output': {
    'filename': '[name].js',
    'path': Path.join(__dirname, 'www', 'scripts', 'bundles')
  },
  plugins: [
    new WebPack.IgnorePlugin(/^winston|\.\/process$/),
    new WebPack.LoaderOptionsPlugin({
      'options': {
        // 'nessa': {
        //   'isDebugged': true,
        //   'logPath': LOG_PATH
        // }
      }
    })
  ]
}
