(function() {
  angular
    .module('stockerize.stock-prices')
    .service('StockPricesService', ['$http', Service]);

  function Service($http) {
    var service = this;
    var URL ='https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json'
    URL = './data/stock-prices.json'

    service.get = function(id) {
      return $http.get(URL).then(function(response) {
        postProcess(response.data);
        return response.data[0];
      })
    }

    service.getDailyPrices = function(stock_id) {
      return $http.get(URL).then(function(response) {
        postProcess(response.data);
        return withStockId(response.data, stock_id);
      })
    }

    function postProcess(data) {
      angular.forEach(data, function(price) {
        price.open_close_delta_price = (price.close_price - price.open_price).toFixed(2);
      });
    }

    function withStockId(stockPrices, stock_id) {
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
