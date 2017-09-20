(function() {
  'use strict';
  var webServiceBase = '{!api_host!}';
  var analyticsEnabled = '{!analytics_enabled!}';
  var googleMapsAPIKey = 'AIzaSyCgNsKGtrqTlN4uRXj6HbzR-drBWKqqHxA'; //Also in index.html
  angular
    .module('stockerize', [
            'ngSanitize',
            'ui.router',
            'stockerize.home',
            'stockerize.stocks',
            'stockerize.stock-prices'
          ]
    )
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/404');
      $locationProvider.html5Mode(true);
      $stateProvider.state('stockerize', {
          url: '',
          templateUrl: 'standard-layout.html',
      })
      .state('stockerize-home_if_no_slash', { //[JG] Fixes blank screen when refreshing on home page
          url: '/',
          templateUrl: 'standard-layout.html'
      })
      .state('404', {
        url: '/404',
        templateUrl: '404.html'
      });
    }])
    .constant('config')
    .controller('ApplicationController', ['$sce', '$rootScope', '$scope', '$state',function($sce, $rootScope, $scope, $state) {
      var vm = this;
    }]);
})();
