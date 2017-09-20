(function() {
  'use strict';
  angular
    .module('stockerize.home')
    .controller('HomeController', ['$scope', 'StockPricesService', Controller]);

  function Controller($scope, StockPricesService) {
    var vm = this;
    vm.search = function(criteria) {
      StockPricesService.getDailyPrices("GOOG").then(function(prices) {
        vm.stockPrices = prices;
      })
    }

    vm.purchase = function(stock) {
    }

    vm.sell = function(stock) {
    }

    vm.search();

  }
})();
