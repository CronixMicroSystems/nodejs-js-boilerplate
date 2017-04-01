angular
  .module('DocsApp')
  .controller('AppController',
    function (Endpoints) {
      let vm = this

      vm.endpoints = Endpoints

      vm.search = ''
      vm.filter = function (method) {
        let ok = (vm.search && (new RegExp(vm.search, 'gi').test(method))) || !vm.search

        return ok
      }

      vm.showAllMenus = function () {
        vm.endpoints.forEach(function (endpoint) {
          endpoint.visible = true
        })
      }

      vm.hideAllMenus = function () {
        vm.endpoints.forEach(function (endpoint) {
          endpoint.visible = false
        })
      }

      return vm
    })
