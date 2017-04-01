module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Mailer', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.CHAR(255)
    },
    token: {
      type: DataTypes.CHAR(38),
      defaultValue: DataTypes.UUIDV4,
      unique: true
    }
  }, {
    tableName: 'Mailer',
    timestamps: false
  })
}
