const fs = require('fs')

/**
 * Read all files in this file's directory
 * @type {object}
 */
const files = fs.readdirSync(`${__dirname}/`)

/**
 * Cycles through each file and exports it
 * as the file name. Example: File.js is exported as export.File
 */
files.forEach((file) => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name = file.replace('.js', '')
    exports[name.toLowerCase()] = require(`./${file}`)
  }
})
