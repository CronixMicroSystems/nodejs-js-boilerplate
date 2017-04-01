module.exports = {
  returnResult: (ctx, statusCode = 200) => {
    return (result = {}) => {
      if (ctx.body) return result

      ctx.status = statusCode
      ctx.type = 'application/json'
      const data = {}
      data.success = true
      data.data = result
      ctx.body = JSON.stringify(data)

      return result
    }
  },

  returnError: (ctx, statusCode = 400) => {
    return (err = {}) => {
      if (ctx.body) return err
      console.log('1111111')

      ctx.status = statusCode
      ctx.type = 'application/json'
      const data = {}
      data.success = false
      data.data = err.message || 'Unknown exception'
      ctx.body = JSON.stringify(data)

      return err
    }
  }
}
