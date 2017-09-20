(function() {
  angular
    .module('stockerize.stocks')
    .service('StockPricesService', ['$http', Service]);

  function Service($http) {
    var service = this;
    var URL ='https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json'
    URL = './data/test_data.json'

    service.get = function(id) {
      return $http.get(URL).then(function(response) {
        postProcess(response.data);
        return response.data[0];
      })
    }

    service.getDailyPrices = function(ticker) {
      return $http.get(URL, getParams(ticker)).then(function(response) {
        postProcess(response.data);
        return response.data;
      })
    }

    function postProcess(data) {
      angular.forEach(data, function(price) {
        price.open_close_delta_price = (price.close_price - price.open_price).toFixed(2);
      });
    }

    function getParams(ticker) {
      return {
        ticker: ticker
      }
    }
  }
})();
