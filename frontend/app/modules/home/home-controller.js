(function() {
  'use strict';
  angular
    .module('stockerize.home')
    .controller('HomeController', ['$state', '$scope', 'StockPricesService', Controller]);

  function Controller($state, $scope, StockPricesService) {
    var vm = this;
    function initialize() {
      vm.stocksByTicker = {};
      vm.tickers = $state.params.tickers ? $state.params.tickers.split(',') : [];
      vm.resolution = $state.params.tickers ? $state.params.resolution || 'daily' : null;
      vm.criteria = {
        ticker: vm.tickers.join(','),
        resolution: vm.resolution
      };
      vm.search(vm.criteria);
    }

    vm.selectResolution = function(resolution) {
      $state.params.resolution = resolution;
      $state.go($state.current, angular.copy($state.params), {reload: true})
    }

    vm.search = function(criteria) {
      if (!criteria.ticker.length) {
        criteria.ticker = null;
      }
      StockPricesService.query(criteria).then(function(prices) {
        vm.stockPrices = prices;
        angular.forEach(vm.stockPrices, function(stockPrice) {
          vm.stocksByTicker[stockPrice.ticker] = vm.stocksByTicker[stockPrice.ticker] || [];
          vm.stocksByTicker[stockPrice.ticker].push(stockPrice);
        });
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

    vm.getStockPrices = function(ticker) {
    }

    initialize();
  }
})();
