(function() {
  'use strict';
  angular
    .module('stockerize.stocks')
    .controller('StocksShowController', ['$scope', '$state', '$filter', 'StocksService', 'StockPricesService', Controller]);

  function Controller($scope, $state, $filter, StocksService, StockPricesService) {
    var vm = this;

    function initialize() {
      vm.getStock($state.params.id);
      vm.chartOptions = {
        maintainAspectRatio: false,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                  beginAtZero:true
              }
            }]
          }
        }
      };
    }

    function updateChart(stockPrices) {
      vm.stockSeries = ['Close Price $', 'Open Price $']
      vm.stockLabels = [];
      vm.stockData = [[], []];
      vm.chartColors = ['#803690', '#46BFBD'];
      stockPrices = $filter('orderBy')(stockPrices, 'date')
      angular.forEach(stockPrices, function(stockPrice) {
        vm.stockLabels.push($filter('date')(stockPrice.date, 'MM-dd-yyyy'));
        vm.stockData[0].push(stockPrice.close_price_cents / 100);
        vm.stockData[1].push(stockPrice.open_price_cents / 100);
      });
    }

    vm.getStock = function(id) {
      StocksService.get(id).then(function(stock) {
        vm.stock = stock;
        vm.getStockPrices(stock);
      });
    }

    vm.getStockPrices = function(stock) {
      StockPricesService.query({stock_id: stock.id}).then(function(stockPrices) {
        vm.stock.prices = stockPrices;
        StocksService.updateStats(vm.stock);
        updateChart(vm.stock.prices);
      });
    }

    initialize();
  }
})();
