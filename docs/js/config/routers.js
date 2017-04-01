angular.module('DocsApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true)

  $urlRouterProvider.otherwise('/documentation')

  $stateProvider
    .state('app', {
      abstract: true,
      url: '/v1',
      templateUrl: 'pages/app.html'
    })

    // route for the method page
    .state('method', {
      url: '/method/:endpointName/:methodName',
      templateUrl: 'pages/method.html',
      controller: 'MethodController as ctrl'
    })

    // route for the documentation page
    .state('documentation', {
      url: '/documentation',
      templateUrl: 'pages/documentation.html',
      controller: 'DocumentationController as ctrl'
    })

    // route for the updates page
    .state('updates', {
      url: '/updates',
      templateUrl: 'pages/updates.html',
      controller: 'UpdatesController as ctrl'
    })

    // route for the support page
    .state('support', {
      url: '/support',
      templateUrl: 'pages/support.html',
      controller: 'SupportController as ctrl'
    })

    // route for the updates page
    .state('uploads', {
      url: '/uploads',
      templateUrl: 'pages/uploads.html',
      controller: 'UploadsController as ctrl'
    })
})
