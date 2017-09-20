(function() {
  'use strict';
  angular
    .module('stockerize.stocks')
    .controller('StocksShowController', ['$scope', '$state', 'StocksService', 'StockPricesService', Controller]);

  function Controller($scope, $state, StocksService, StockPricesService) {
    var vm = this;

    function initialize() {
      vm.getStock($state.params.id);
    }

    vm.getStock = function(id) {
      StocksService.get(id).then(function(stock) {
        vm.stock = stock;
        vm.getStockPrices(stock);
      });
    }

    vm.getStockPrices = function(stock) {
      StockPricesService.getDailyPrices(stock.id).then(function(stockPrices) {
        vm.stock.prices = stockPrices;
        StocksService.updateStats(vm.stock);
      });
    }

    initialize();
  }
})();
