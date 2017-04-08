const fs = require('fs')
const v1 = require('koa-router')()

/**
 * Read all files in this file's directory
 * @type {object}
 */
const files = fs.readdirSync(`${__dirname}/`)

/**
 * Cycles through each file and create router for it
 */
files.forEach((file) => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name = file.replace('.js', '')

    const api = require(`./${name}.js`)
    v1.use(`/${name}`, api.routes(), api.allowedMethods())
  }
})

module.exports = v1
