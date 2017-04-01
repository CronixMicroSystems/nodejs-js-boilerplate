require('dotenv').config({silent: true})

module.exports = {
  database: {
    host: process.env.SQL_HOST || 'localhost',
    username: process.env.SQL_USERNAME || 'root',
    password: process.env.SQL_PASSWORD || 'root',
    database: process.env.SQL_DATABASE || 'crm-cronix',
    dialect: process.env.SQL_DIALECT || 'mysql',
    logging: (['1', 'true'].indexOf(process.env.SQL_LOGGING) !== -1 ? console.log : false)
  },
  email: {
    DRIVER: process.env.MAIL_DRIVER || 'smtp',
    errorEmail: process.env.errorEmail || 'errorEmail',
    FRONTEND_URL: process.env.MAIL_FRONTEND_URL || 'url',
    HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
    PORT: process.env.MAIL_PORT || '587',
    ENCRYPTION: process.env.MAIL_ENCRYPTION || 'tls',
    NAME: process.env.MAIL_NAME || 'test ',
    auth: {
      USERNAME: process.env.MAIL_USERNAME || 'info@cronix.ms',
      PASSWORD: process.env.MAIL_PASSWORD || 'secret'
    },
    FROM: process.env.MAIL_FROM || 'info@cronix.ms'
  },
  VERSION: process.env.VERSION || '1.0.0',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 4000,
  DOCS_PORT: process.env.DOCS_PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY || '9eadd8c14e7f30a016dd42c1c53918c8',
  SEED: true,
  DEBUG: true
}
