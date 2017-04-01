module.exports = {
  field: (arrayField, search) => {
    let arrayConclusion = []
    arrayField.map(item => {
      let itemA = {}
      itemA[item] = {$like: '%' + search + '%'}
      arrayConclusion.push(itemA)
    })
    return arrayConclusion
  }
}
