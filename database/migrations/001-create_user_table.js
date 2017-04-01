module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = queryInterface.createTable(
      'User', {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: Sequelize.CHAR(38),
          allowNull: false
        },
        password: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        firstName: {
          type: Sequelize.CHAR(38),
          allowNull: false
        },
        lastName: {
          type: Sequelize.CHAR(38),
          allowNull: true
        },
        middleName: {
          type: Sequelize.CHAR(38),
          allowNull: true
        },
        gender: {
          type: Sequelize.ENUM('male', 'female'),
          allowNull: true
        },
        phone: {
          type: Sequelize.CHAR(38),
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      })
    return query
  },

  down: (queryInterface, Sequelize) => {
    const query = queryInterface.dropTable('User')

    return query
  }
}

