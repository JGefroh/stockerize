(function() {
  'use strict';
  angular
    .module('stockerize.stocks')
    .controller('StocksShowController', ['$scope', '$state', '$filter', 'StocksService', 'StockPricesService', Controller]);

  function Controller($scope, $state, $filter, StocksService, StockPricesService) {
    var vm = this;

    function initialize() {
      vm.getStock($state.params.id);
      vm.resolution = $state.params.resolution || 'daily'
    }
    vm.getStock = function(id) {
      StocksService.get(id).then(function(stock) {
        vm.stock = stock;
        vm.getStockPrices(stock);
      });
    }

    vm.selectResolution = function(resolution) {
      $state.params.resolution = resolution;
      $state.go($state.current, angular.copy($state.params), {reload: true})
    }

    vm.getStockPrices = function(stock) {
      StockPricesService.query({ticker: stock.ticker, resolution: vm.resolution}).then(function(stockPrices) {
        vm.stock.prices = stockPrices.filter(function(item) {
          return item.ticker;
        });
        StocksService.updateStats(vm.stock);
      });
    }

    initialize();
  }
})();
