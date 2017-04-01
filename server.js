const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')

const koajwt = require('koa-jwt')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')

const config = require('./config')

const {role} = require('./app/middleware')
// const {EmailService} = require('./app/services')

const db = require('./database/models')

const app = new Koa()

app.context.db = db

if (config.DEBUG) app.use(logger())

app.use(bodyParser())

app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
}))

// --- PUBLIC ACTIONS HERE

const publicRouter = new Router()

publicRouter.get('/', role('*'), function* () {
  const ctx = this

  ctx.body = 'API v' + config.VERSION
})

publicRouter.get('/test', role('*'), function* () {
  const ctx = this
  ctx.body = 'Test'
})

app.use(publicRouter.routes()).use(publicRouter.allowedMethods())
// app.use(function* (err) {
//   console.log('error',err)
// })

const authRouter = new Router()
const auth = require('./app/api/auth')
authRouter.use('/api/auth', auth.routes(), auth.allowedMethods())
app.use(authRouter.routes()).use(authRouter.allowedMethods())

app.use(koajwt({ secret: config.SECRET_KEY }).unless(() => {}))

// --- PRIVATE ACTIONS HERE

// --- VERSION 1 (LEGACY) API

const mainRouter = new Router()
const v1 = require('./app/api/v1')
mainRouter.use('/api/v1', v1.routes(), v1.allowedMethods())
app.use(mainRouter.routes()).use(mainRouter.allowedMethods())
const server = app.listen(config.PORT)

console.log('http://' + config.HOST + ':' + config.PORT)

module.exports = server
