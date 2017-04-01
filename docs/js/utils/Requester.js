angular
  .module('DocsApp')
  .factory('Requester',
    function ($http, $q, $log, store) {
      return {
        call: function (method, url, data, headers) {
          let deferred = $q.defer()

          let token = store.get('token')

          method = (method || 'GET').toUpperCase()

          data = data || {}
          // remove blank attributes
          Object.keys(data).forEach((key) => ((data[key] == '') || (data[key] == null)) && delete data[key]);

          headers = Object.assign({'Authorization': 'Bearer ' + token}, headers || {})

          $log.log('data', data)

          let request = {
            method: method,
            url: 'http://' + location.hostname + ':4000' + url,
            data: method === 'GET' ? {} : data,
            params: method === 'GET' ? data : {},
            headers: headers
          }

          $http(request)
            .then(function (result) {
              // $log.log('result', result)

              if ([200, 201].indexOf(result.status) !== -1 && result.data && result.data.success && result.data.data) {
                deferred.resolve(result.data.data)
              } else {
                deferred.reject('Unknown error!')
              }
            })
            .catch(function (err) {
              // $log.log('err', err)

              deferred.reject(err.data && err.data.data ? err.data.data : 'Unknown error!')
            })

          return deferred.promise
        }
      }
    })
