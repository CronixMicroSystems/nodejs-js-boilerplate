let liveServer = require('live-server')

const config = require('./config')

let params = {
  port: config.DOCS_PORT,
  host: '0.0.0.0',
  root: './docs',
  open: false,
  watch: ['./docs/css', './docs/js', './docs/pages', './docs/index.html'],
  file: 'index.html',
  wait: 1000,
  logLevel: 0,
  middleware: [function (req, res, next) { next() }]
}

liveServer.start(params)
