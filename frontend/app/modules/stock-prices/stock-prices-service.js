(function() {
  angular
    .module('stockerize.stock-prices')
    .service('StockPricesService', ['$http', 'config', Service]);

  function Service($http, config) {
    var service = this;
    var URL = config.webServiceBase;

    service.query = function(params) {
      return $http.get(URL + '/stock_prices', {params: params}).then(function(response) {
        return response.data;
      })
    }
  }
})();
