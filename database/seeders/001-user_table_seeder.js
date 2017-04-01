const config = require('../../config')

module.exports = {
  up: function (queryInterface, Sequelize) {
    if (!config.SEED) return

    const data = [
      {id: 1, email: 'admin@admin.ru', password: 'e10adc3949ba59abbe56e057f20f883e', firstName: 'admin', lastName: 'admin', middleName: 'admin', gender: 'male', phone: '8 999 123 45 67'},
      {id: 2, email: 'user@user.ru', password: 'e10adc3949ba59abbe56e057f20f883e', firstName: 'user', lastName: 'user', middleName: 'user', gender: 'male', phone: '8 888 321 54 76'},
      {id: 3, email: 'moderator@moderator.ru', password: 'e10adc3949ba59abbe56e057f20f883e', firstName: 'moderator', lastName: 'moderator', middleName: 'moderator', gender: 'female', phone: '8 777 333 11 22'},
    ]

    if (!data || !data.length) return

    return queryInterface.bulkInsert('User', data, {})
  },

  down: function (queryInterface, Sequelize) {
    if (!config.SEED) return

    return queryInterface.bulkDelete('User', null, {})
  }
}
