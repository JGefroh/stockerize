(function() {
  angular
    .module('stockerize.components')
    .directive('resolutionSelect', Directive);
  function Directive() {
    function Controller(config) {
      var vm = this;
      vm.resolutions = [
        {
          label: 'Day',
          value: 'daily'
        },
        {
          label: 'Week',
          value: 'weekly'
        },
        {
          label: 'Month',
          value: 'monthly'
        },
        {
          label: 'Quarter',
          value: 'quarterly'
        },
        {
          label: 'Year',
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
