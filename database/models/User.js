const md5 = require('md5')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.CHAR(255)
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: function () {
        return md5('123456')
      },
      set: function (value) {
        this.setDataValue('password', md5(value))
      }
    },
    firstName: {
      type: DataTypes.CHAR(38)
    },
    lastName: {
      type: DataTypes.CHAR(38)
    },
    middleName: {
      type: DataTypes.CHAR(38)
    },
    gender: {
      type: DataTypes.ENUM('male', 'female')
    },
    phone: {
      type: DataTypes.CHAR(38)
    },
  }, {
    tableName: 'User',
    paranoid: true,
  })
}
