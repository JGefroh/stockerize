(function() {
  angular
    .module('stockerize.stock-prices')
    .service('StockPricesService', ['$http', 'config', Service]);

  function Service($http, config) {
    var service = this;
    var URL = config.webServiceBase;

    service.query = function(params) {
      return $http.get(URL + '/stock_prices', {params: params}).then(function(response) {
        postProcess(response.data);
        return response.data;
      })
    }

    function postProcess(data) {
      angular.forEach(data, function(price) {
        price.open_close_delta_price_cents = (price.close_price_cents - price.open_price_cents);
        price.low_high_delta_price_cents = (price.high_price_cents - price.low_price_cents);
      });
    }
  }
})();
