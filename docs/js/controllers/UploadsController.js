angular
  .module('DocsApp')
  .controller('UploadsController',
    function ($log, $timeout, $interval, FileUploader, store) {
      let vm = this

      vm.url = store.get('url')

      $interval(function () {
        store.set('url', vm.url)
      }, 100)

      vm.parameters = [{key: '', value: ''}]

      let token = store.get('token')

      let headers = {}

      let uploader = vm.uploader = new FileUploader({
        headers: Object.assign({'Authorization': 'Bearer ' + token}, headers || {})
      })

      // FILTERS

      // a sync filter
      uploader.filters.push({
        name: 'syncFilter',
        fn: function (item /* {File|FileLikeObject} */, options) {
          let vm = this

          $log.log('syncFilter')

          return vm.queue.length < 10
        }
      })

      // an async filter
      uploader.filters.push({
        name: 'asyncFilter',
        fn: function (item /* {File|FileLikeObject} */, options, deferred) {
          $log.log('asyncFilter')

          $timeout(deferred.resolve, 1e3)
        }
      })

      // CALLBACKS

      uploader.onWhenAddingFileFailed = function (item /* {File|FileLikeObject} */, filter, options) {
        // $log.info('onWhenAddingFileFailed', item, filter, options)
      }
      uploader.onAfterAddingFile = function (fileItem) {
        // $log.info('onAfterAddingFile', fileItem)
      }
      uploader.onAfterAddingAll = function (addedFileItems) {
        // $log.info('onAfterAddingAll', addedFileItems)
      }
      uploader.onBeforeUploadItem = function (item) {
        item.url = vm.url

        let formData = []

        vm.parameters.forEach(function (parameter) {
          // $log.log('parameter', parameter)

          const item = {}

          item[parameter.key] = parameter.value

          formData.push(item)
        })

        item.formData = formData

        // $log.info('onBeforeUploadItem', item)
      }
      uploader.onProgressItem = function (fileItem, progress) {
        // $log.info('onProgressItem', fileItem, progress)
      }
      uploader.onProgressAll = function (progress) {
        // $log.info('onProgressAll', progress)
      }
      uploader.onSuccessItem = function (fileItem, response, status, headers) {
        $log.info('onSuccessItem', fileItem, response, status, headers)
      }
      uploader.onErrorItem = function (fileItem, response, status, headers) {
        // $log.info('onErrorItem', fileItem, response, status, headers)
      }
      uploader.onCancelItem = function (fileItem, response, status, headers) {
        // $log.info('onCancelItem', fileItem, response, status, headers)
      }
      uploader.onCompleteItem = function (fileItem, response, status, headers) {
        // $log.info('onCompleteItem', fileItem, response, status, headers)
      }
      uploader.onCompleteAll = function () {
        // $log.info('onCompleteAll')
      }

      // $log.info('uploader', uploader)

      return vm
    })
