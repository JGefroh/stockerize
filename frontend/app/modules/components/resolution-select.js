(function() {
  angular
    .module('stockerize.components')
    .directive('resolutionSelect', Directive);
  function Directive() {
    function Controller(config) {
      var vm = this;
      vm.resolutions = [
        {
          label: '1-day',
          value: 'daily'
        },
        {
          label: '7-day',
          value: 'weekly'
        },
        {
          label: '1-month',
          value: 'monthly'
        },
        {
          label: '3-month',
          value: 'quarterly'
        },
        {
          label: '1-year',
          value: 'yearly'
        }
      ]
    }

    return {
      restrict: 'E',
      templateUrl: 'resolution-select.html',
      controller: ['config', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        ngModel: '=',
        onSelect: '&'
      }
    };
  }
})();
