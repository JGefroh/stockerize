(function() {

  angular
    .module('stockerize.stocks')
    .directive('stockPricesTable', Directive);
    function Directive() {
      function Controller() {
        var vm = this;
      }

      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'stock-prices-table.html',
        controller: Controller,
        controllerAs: 'vm',
        bindToController: true,
        scope: {
          stock: '=?',
          stockPrices: '=',
          truncate: '='
        }
      };
    }
})();
