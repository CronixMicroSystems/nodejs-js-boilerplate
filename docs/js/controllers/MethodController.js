angular
  .module('DocsApp')
  .controller('MethodController',
    function ($state, $stateParams, $injector, $timeout, $window, $log, $sce, Requester, Validator) {
      let vm = this

      vm.endpointName = $stateParams.endpointName
      vm.methodName = $stateParams.methodName

      if (!vm.endpointName || !vm.methodName) return $state.go('documentation')

      vm.endpoint = $injector.get(vm.endpointName)

      if (!vm.endpoint) return $state.go('documentation')

      vm.method = vm.endpoint.methods[vm.methodName]

      if (!vm.method) return $state.go('documentation')

      let methodStructure = vm.methodName.split('@')

      vm.name = methodStructure[0]
      vm.type = methodStructure[1]

      vm.link = vm.method.link

      vm.parameters = vm.method.parameters

      vm.loading = false

      vm.getData = function () {
        let data = {}

        for (let parameter in vm.parameters) data[parameter] = vm.parameters[parameter].value

        return data
      }

      vm.getRules = function () {
        let rules = {}

        for (let parameter in vm.parameters) rules[parameter] = vm.parameters[parameter].validator

        return rules
      }

      vm.validate = function () {
        vm.errors = Validator.validate(vm.getData(), vm.getRules(), true).errors
      }

      /**
       * Send an request with input parameters
       */
      vm.send = function () {
        vm.validate()

        $log.log('vm.errors', vm.errors)

        if (Object.keys(vm.errors).length) {
          return
        }
        vm.startTime = new Date().getTime()
        vm.url = vm.link

        vm.requestData = {}

        for (let parameter in vm.parameters) {
          if (vm.url.indexOf(parameter) > -1) {
            vm.url = vm.url.replace(':' + parameter, vm.parameters[parameter].value)
          } else {
            vm.requestData[parameter] = vm.parameters[parameter].value
          }
        }

        vm.loading = true

        Requester.call(vm.type, vm.url, vm.requestData)
          .then(function (result) {
            if (angular.isFunction(vm.method.callback)) vm.method.callback(result)

            vm.data = {success: true, data: result}

            vm.endTime = new Date().getTime()

            vm.time = vm.endTime - vm.startTime

            vm.loading = false
          })
          .catch(function (err) {
            vm.data = {success: false, data: err}
            vm.loading = false
          })
      }
      /**
       * Show object/array as a table
       *
       * @param obj
       * @returns {*}
       */
      vm.print = function (obj) {
        let content = ''

        let make = function (arr, revert) {
          if (!arr || !arr.length || (angular.isObject(arr[0]) && !Object.keys(arr[0]).length)) return '<strong class="text-danger">NO DATA!</strong>'

          if (!angular.isObject(arr[0])) return '<strong>' + angular.toJson(arr) + '</strong>'

          let table = '<table class="table table-bordered">'

          let key = null

          if (revert) {
            for (key in arr[0]) {
              table += '<tr>'
              arr.forEach(function (item, index) {
                if (!index) table += '<td><strong>' + key + '</strong></td>'
                const val = item[key]
                table += '<td width="100%">' + (angular.isObject(val) ? angular.toJson(val) : val) + '</td>'
              })
              table += '</tr>'
            }
          } else {
            arr.forEach(function (item, index) {
              if (!index) {
                table += '<thead><tr>'
                for (key in item) table += '<th>' + key + '</th>'
                table += '</tr></thead>'
              }

              table += '<tr>'
              for (key in item) {
                const val = item[key]

                table += '<td>' + (angular.isObject(val) ? angular.toJson(val) : val) + '</td>'
              }
              table += '</tr>'
            })
          }

          table += '</table>'

          return table
        }

        if (angular.isArray(obj)) {
          content = make(obj, obj.length < 10)
        } else if (angular.isObject(obj)) {
          content = make([obj], true)
        } else {
          content = '<div>' + obj + '</div>'
        }

        return $sce.trustAsHtml(content)
      }

      $timeout(function () {
        vm.send()
      }, 100)

      return vm
    })
