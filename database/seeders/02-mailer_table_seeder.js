const config = require('../../config')

module.exports = {
  up: function (queryInterface, Sequelize) {
    if (!config.SEED) return

    const data = []

    if (!data || !data.length) return

    return queryInterface.bulkInsert('Mailer', data, {})
  },

  down: function (queryInterface, Sequelize) {
    if (!config.SEED) return

    return queryInterface.bulkDelete('Mailer', null, {})
  }
}
