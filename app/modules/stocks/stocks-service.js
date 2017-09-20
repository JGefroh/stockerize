(function() {
  angular
    .module('stockerize.stocks')
    .service('StocksService', ['$http', Service]);

  function Service($http) {
    var service = this;
    URL = './data/stocks.json'

    service.query = function() {
      return $http.get(URL).then(function(response) {
        return response.data[0];
      })
    }
    service.get = function(id) {
      return $http.get(URL).then(function(response) {
        return stockWithId(response.data, id);
      })
    };

    function stockWithId(data, id) {
      var match = null;
      angular.forEach(data, function(stock) {
        if (stock.id == id) {
          match = stock;
        }
      });
      return match;
    }
  }
})();
