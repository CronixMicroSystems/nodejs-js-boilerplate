angular
  .module('DocsApp')
  .factory('Endpoints',
    function (Auth) {
      return {
        Auth: Auth
      }
    })
