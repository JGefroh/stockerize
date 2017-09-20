(function() {
  angular
    .module('stockerize.stocks')
    .service('StocksService', ['$q', 'StockPricesService', Service]);

  function Service($q) {
    var service = this;
    service.get = function(id) {
      return $q.when({ticker: 'GOOG'});
    }
  }
})();
