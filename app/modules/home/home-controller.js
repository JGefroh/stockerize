(function() {
  'use strict';
  angular
    .module('stockerize.home')
    .controller('HomeController', ['$scope', 'StockService', Controller]);

  function Controller($scope, StockService) {
    var vm = this;
    vm.search = function(criteria) {
      console.info("HEY")
      StockService.getDailyPrices("GOOG").then(function(prices) {
        vm.prices = prices;
      })
    }
  }
})();
