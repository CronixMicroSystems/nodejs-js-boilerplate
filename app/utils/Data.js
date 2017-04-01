module.exports = {
  objective: (data, list) => {
    let obj = {}

    if (data) {
      list.forEach(item => {
        if (data.hasOwnProperty(item)) {
          obj[item] = data[item]
        }
      })
    }

    return obj
  }
}
