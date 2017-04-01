const nodemailer = require('nodemailer')
let config = require('../../config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.auth.USERNAME,
    pass: config.email.auth.PASSWORD
  }
})

module.exports = {
  sendReset: (email, token) => {
    const mailOptions = {
      from: config.email.FROM,
      to: email,
      subject: 'cronix.ms Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      config.email.FRONTEND_URL + 'resetpwd/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
    })
  },
  sendConfirm: (email, password, token) => {
    const mailOptions = {
      from: config.email.FROM,
      to: email,
      subject: 'cronix.ms Account Registration',
      text: 'Welcome to Cronix team!\n\n' +
      'You account was created and must be activated before you can use it.\n' +
      'To activate the account click on the following link or copy-paste it in you browser:\n\n' +
      config.email.FRONTEND_URL + 'signin/' + token + '\n\n' +
      'using the following email and password\n\n' +
      'Email: ' + email + '\n' +
      'Password: ' + password + '\n'
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
    })
  },
  sendError: (err) => {
    const mailOptions = {
      from: config.email.FROM,
      to: config.email.errorEmail,
      subject: 'ErrorServer.boilerplate-nodeJs',
      text: `${err}`
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
    })
  }
}
