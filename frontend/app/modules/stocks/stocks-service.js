(function() {
  angular
    .module('stockerize.stocks')
    .service('StocksService', ['$http','config', Service]);

  function Service($http, config) {
    var service = this;
    var URL = config.webServiceBase;

    service.query = function() {
      return $http.get(URL).then(function(response) {
        return response.data[0];
      })
    }
    service.get = function(id) {
      return $http.get(URL + '/stocks/' + id).then(function(response) {
        return response.data;
      })
    };

    service.updateStats = function(stock) {
      calculateAverageVolume(stock);
      calculateLosingDays(stock);
    }

    function calculateAverageVolume(stock) {
      stock.average_volume = 0;
      angular.forEach(stock.prices, function(stockPrice) {
        stock.average_volume += stockPrice.volume;
      });

      if (stock.prices.length) {
        stock.average_volume /= stock.prices.length;
      }
    }

    function calculateLosingDays(stock) {
      stock.losing_days_count = 0;
      angular.forEach(stock.prices, function(stockPrice) {
        if (stockPrice.close_price < stockPrice.open_price) {
          stock.losing_days_count++;
        }
      });
    }
  }
})();
