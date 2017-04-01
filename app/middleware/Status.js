module.exports = (options = {}) => {
  return function * (next) {
    try {
      yield next
    } catch (err) {
      if (err.status === 401) {
        this.status = 401
        this.body = 'Protected resource, use Authorization header to get access\n'
      } else {
        this.status = err.status || 500
        this.body = err.message
      }
    }
  }
}
