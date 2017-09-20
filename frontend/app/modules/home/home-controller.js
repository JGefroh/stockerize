(function() {
  'use strict';
  angular
    .module('stockerize.home')
    .controller('HomeController', ['$scope', 'StockPricesService', Controller]);

  function Controller($scope, StockPricesService) {
    var vm = this;

    function initialize() {
      vm.criteria = {
        ticker: null
      };
      vm.search({});
    }
    vm.search = function(criteria) {
      StockPricesService.query(criteria).then(function(prices) {
        vm.stockPrices = prices;
      })
    }

    vm.purchase = function(stock) {
    }

    vm.sell = function(stock) {
    }

    initialize();
  }
})();
