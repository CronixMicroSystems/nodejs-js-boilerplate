const moment = require('moment')

module.exports = {
  now: function () {
    return moment.utc().format('YYYY-MM-DD HH:mm:ss')
  },

  formatDateTime: function (date) {
    return moment.utc(date).format('YYYY-MM-DD HH:mm:ss')
  }
}
