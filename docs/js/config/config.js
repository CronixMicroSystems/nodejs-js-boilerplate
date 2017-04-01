angular.module('DocsApp').config(function () {

})

angular.module('DocsApp').run(function (editableThemes, editableOptions) {
  editableThemes.bs3.inputClass = 'input-xs'
  editableThemes.bs3.buttonsClass = 'btn-xs'
  editableOptions.theme = 'bs3'
})
