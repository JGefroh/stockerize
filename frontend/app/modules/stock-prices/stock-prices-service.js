(function() {
  angular
    .module('stockerize.stock-prices')
    .service('StockPricesService', ['$http', 'config', Service]);

  function Service($http, config) {
    var service = this;
    var URL = config.webServiceBase;
    console.info(URL);

    service.get = function(id) {
      return $http.get(URL + '/stock_prices/').then(function(response) {
        postProcess(response.data);
        return response.data[0];
      })
    }

    service.query = function(params) {
      return $http.get(URL, params).then(function(response) {
        postProcess(response.data);
        return withStockId(response.data, params.stock_id);
      })
    }

    service.getDailyPrices = function(stock_id) {
      return $http.get(URL + '/stock_prices/').then(function(response) {
        postProcess(response.data);
        return withStockId(response.data, stock_id);
      })
    }

    function postProcess(data) {
      angular.forEach(data, function(price) {
        price.open_close_delta_price_cents = (price.close_price_cents - price.open_price_cents);
        price.low_high_delta_price_cents = (price.high_price_cents - price.low_price_cents);
      });
    }

    function withStockId(stockPrices, stock_id) {
      if (!stock_id) {
        return stockPrices;
      }

      var matches = [];
      angular.forEach(stockPrices, function(stockPrice) {
        if (stockPrice.stock_id == stock_id) {
          matches.push(stockPrice);
        }
      });
      return matches;
    }
  }
})();
