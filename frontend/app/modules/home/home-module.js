(function() {
  angular
    .module('stockerize.home', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('stockerize.home', {
        url: '/?tickers',
        templateUrl: 'home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
    }).state('stockerize.about', {
        url: '/about',
        templateUrl: 'about.html'
    })
  }
})();
