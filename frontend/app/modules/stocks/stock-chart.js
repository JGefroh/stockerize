(function() {
  angular
    .module('stockerize.stock-prices')
    .directive('stockChart', Directive);
  function Directive() {
    function Controller($scope, $filter) {
      var vm = this;
      $scope.$watch(vm.stockPrices, function(oldStockPrices, newStockPrices) {
        updateChart(vm.stockPrices)
      });

      vm.chartOptions = {
        maintainAspectRatio: false,
        animation: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: vm.beginAtZero
            }
          }]
        }
      };

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
    }

    return {
      restrict: 'E',
      templateUrl: 'stock-chart.html',
      controller: ['$scope', '$filter', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        stockPrices: '=',
        beginAtZero: '=?'
      }
    };
  }
})();
