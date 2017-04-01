const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const config = require('../../config').database

let db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname).forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const model = sequelize['import'](path.join(__dirname, file))

    db[model.name] = model
  }
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db)
})

db.sequelize = sequelize

module.exports = db
