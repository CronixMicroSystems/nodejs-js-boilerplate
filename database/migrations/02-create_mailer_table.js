module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = queryInterface.createTable(
      'Mailer', {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: Sequelize.CHAR(38)
        },
        token: {
          type: Sequelize.CHAR(38)
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      })
    return query
  },

  down: (queryInterface, Sequelize) => {
    const query = queryInterface.dropTable('Mailer')
    return query
  }
}
