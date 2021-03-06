(function() {
  angular
    .module('stockerize.stocks', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('stockerize.stocks', {
        url: '/stocks/:id?resolution',
        templateUrl: 'stocks-show.html',
        controller: 'StocksShowController',
        controllerAs: 'vm',
    });
  }
})();
