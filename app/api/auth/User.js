const router = require('koa-router')()
const koajwt = require('koa-jwt')
const md5 = require('md5')

const config = require('../../../config')

const {Handlers, Validator} = require('../../utils')

const {returnResult, returnError} = Handlers

const {EmailService} = require('../../services')

router.post('/login', function* () {
  const ctx = this
  const {parameters, errors} = Validator.validate(ctx.request.body, {
    email: [{isEmail: {}}],
    password: [{isExistAndNotEmpty: {}}]
  })

  // if (parameters.err.build.ddddd) {
  //   returnError(ctx)()
  // }
  if (errors && Object.keys(errors).length) {
    return returnError(ctx, 400)(errors)
  }

  yield ctx.db.User.findOne({
    where: {
      email: parameters.email,
      password: md5(parameters.password)
    },
    attributes: ['id', 'email', 'firstName', 'lastName', 'middleName']
  }).then(user => {
    if (user) {
      const token = koajwt.sign(user.dataValues, config.SECRET_KEY)

      ctx.set('Authorization', `Bearer ${token}`)

      return returnResult(ctx, 201)({user: user.dataValues, token: token})
    } else {
      return returnError(ctx, 400)({message: 'Wrong credentials'})
    }
  })
    .catch(returnError(ctx))
})

router.post('/logout', function* () {
  const ctx = this

  ctx.set('Authorization', null)

  return returnResult(ctx, 201)()
})

router.post('/register', function* () {
  const ctx = this

  const {parameters, errors} = Validator.validate(ctx.request.body, {
    email: [{isEmail: {}}],
    password: [{isExistAndNotEmpty: {}}],
    firstName: [{isExistAndNotEmpty: {}}],
    lastName: [{isExistAndNotEmpty: {}}],
    middleName: [{isExistAndNotEmpty: {}}]
  })

  if (errors && Object.keys(errors).length) {
    return returnError(ctx, 400)(errors)
  }

  yield ctx.db.User.findOrCreate({
    where: {
      email: parameters.email
    },
    defaults: Object.assign(parameters)
  })
    .then(result => {
      const user = result[0]
      const created = result[1]

      if (user) {
        if (created) {
          return ctx.db.User.findOne({
            where: {
              email: parameters.email
            },
            attributes: ['id', 'email', 'firstName', 'lastName', 'middleName']
          })
        } else {
          return returnError(ctx, 403)({message: 'User already exists'})
        }
      } else {
        return returnError(ctx, 400)({message: 'Wrong data fields'})
      }
    })
    .then(user => {
      const token = koajwt.sign(user.dataValues, config.SECRET_KEY)

      ctx.set('Authorization', `Bearer ${token}`)

      return returnResult(ctx, 201)({user: user.dataValues, token: token})
    })
    .catch(returnError(ctx))
})

router.post('/forgot', function* () {
  const ctx = this

  const data = Validator.validate(ctx.request.body, {
    email: [{isEmail: {}}]
  })

  if (data.errors && Object.keys(data.errors).length) {
    return returnError(ctx, 400)(data.errors)
  }

  const parameters = data.parameters

  yield ctx.db.User.findOne({
    where: {
      email: parameters.email
    }
  })
    .then(user => {
      if (user) {
          return ctx.db.Mailer.create(parameters)
      } else {
        return returnError(ctx, 400)({message: 'Email is wrong. Please, try again'})
      }
    })
    .then(result => {
      EmailService.sendReset(parameters.email, result.dataValues.token)
      return returnResult(ctx, 201)({ message: 'Sent!', link: config.email.FRONTEND_URL + 'resetpwd/' + result.dataValues.token })
    })
    .then(returnResult(ctx, 201))
    .catch(returnError(ctx))

  return returnResult(ctx, 201)()
})

router.get('/reset/:token', function* () {
  const ctx = this

  const token = ctx.params.token

  yield ctx.db.Mailer.findOne({
    where: {
      token: token
    },
    attributes: ['email']
  })
    .then(result => {
      if (result) {
        returnResult(ctx)(result.dataValues)
      } else {
        return returnError(ctx, 404)({message: 'Not found'})
      }
    })

  return returnResult(ctx, 201)()
})

router.post('/reset/:token', function* () {
  const ctx = this

  const token = ctx.params.token

  const userData = Validator.validate(ctx.request.body, {
    password: [{isExistAndNotEmpty: {}}]
  })

  const userParameters = userData.parameters

  yield ctx.db.Mailer.findOne({
    where: {
      token: token
    },
    attributes: ['email']
  })
    .then(result => {
      if (result) {
        ctx.db.Mailer.destroy({
          where: {
            token: token
          }
        })
        return ctx.db.User.update(userParameters, {
          where: {
            email: result.dataValues.email
          }
        })
      } else {
        return returnError(ctx, 404)({message: 'Not found'})
      }
    })
    .then(returnResult(ctx, 201))
    .catch(returnError(ctx))

  return returnResult(ctx, 201)()
})

router.post('/:id/reset', function* () {
  const ctx = this

  const userData = Validator.validate(ctx.request.body, {
    oldPassword: [{isExistAndNotEmpty: {}}],
    password: [{isExistAndNotEmpty: {}}]
  })
  const userParameters = userData.parameters

  yield ctx.db.User.findOne({
    where: {
      id: ctx.params.id,
      password: md5(userParameters.oldPassword)
    },
    attributes: ['email']
  })
    .then(result => {
      if (result) {
        return ctx.db.User.update({ password: userParameters.password }, {
          where: { id: ctx.params.id }
        })
      } else {
        return returnError(ctx, 404)({message: 'Old password is wrong. Please, try again'})
      }
    })
    .then(returnResult(ctx, 201))
    .catch(returnError(ctx))

  return returnResult(ctx, 201)()
})

module.exports = router
