(function() {
  'use strict';
  angular
    .module('stockerize.home')
    .controller('HomeController', ['$state', '$scope', 'StockPricesService', Controller]);

  function Controller($state, $scope, StockPricesService) {
    var vm = this;
    function initialize() {
      vm.tickers = $state.params.tickers ? $state.params.tickers.split(',') : [];
      vm.criteria = {
        ticker: vm.tickers.join(',')
      };
      vm.search(vm.criteria);
    }

    vm.search = function(criteria) {
      if (!criteria.ticker.length) {
        criteria.ticker = null;
      }
      StockPricesService.query(criteria).then(function(prices) {
        vm.stockPrices = prices;
      })
    }

    vm.add = function(tickers) {
      vm.tickers = vm.tickers.concat(tickers.split(',')).join(',')
      $state.params.tickers = vm.tickers;
      $state.go($state.current, angular.copy($state.params), {reload: true})
    }

    vm.remove = function(ticker) {
      vm.tickers.splice(vm.tickers.indexOf(ticker), 1)
      vm.tickers = vm.tickers.join(',')
      $state.params.tickers = vm.tickers;
      $state.go($state.current, angular.copy($state.params), {reload: true})
    }

    initialize();
  }
})();
