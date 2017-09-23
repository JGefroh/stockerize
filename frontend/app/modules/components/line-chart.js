(function() {
  angular
    .module('stockerize.components')
    .directive('lineChart', Directive);
  function Directive() {
    function Controller(config) {
      var vm = this;
    }

    return {
      restrict: 'E',
      templateUrl: 'line-chart.html',
      controller: ['config', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
          labels: '=',
          series: '=',
          colors: '=',
          options: '=',
          data: '=',
          onClick: '='
      }
    };
  }
})();
