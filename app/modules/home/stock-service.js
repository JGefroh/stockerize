(function() {
  angular
    .module('stockerize.home')
    .service('StockService', ['$http', Service]);

  function Service($http) {
    var service = this;
    var URL ='https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json'
    URL = './data/test_data.json'
    var API_KEY = "Fz4khrkipWZeHogcmW2E";

    service.getDailyPrices = function(ticker) {
      return $http.get(URL, getParams(ticker)).then(function(response) {
        return response.data;
      })
    }

    function getParams(ticker) {
      return {
        ticker: ticker,
        api_key: API_KEY
      }
    }
  }
})();
