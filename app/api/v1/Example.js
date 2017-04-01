const router = require('koa-router')()

const {returnResult} = require('../../utils').Handlers

// GET /example -> List all objects in JSON.
// GET /example/:id -> Returns the object for the given ID
// POST /example/ -> JSON data to add new object to db.
// PUT /example/:id -> JSON data to update the object data.
// DELETE /patients/:id -> Removes the object with the specified ID.
// OPTIONS /example/ -> Gives the list of allowed request types./
// HEAD /example/ -> HTTP headers only, no body.
// TRACE /example/ -> Blocked for security reasons.

router.get('/', function* () {
  const ctx = this

  return returnResult(ctx)()
})

router.get('/:id', function* () {
  const ctx = this

  return returnResult(ctx)()
})

router.post('/:id', function* () {
  const ctx = this

  return returnResult(ctx)()
})

router.delete('/:id', function* () {
  const ctx = this

  return returnResult(ctx)()
})

router.options('/', function* () {
  const ctx = this

  return returnResult(ctx)()
})

router.head('/', function* () {
  const ctx = this

  return returnResult(ctx)()
})

router.trace('/', function* () {
  const ctx = this

  return returnResult(ctx)()
})

module.exports = router