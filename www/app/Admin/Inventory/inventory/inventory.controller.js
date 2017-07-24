(function() {
    'use strict';

    angular
        .module('Admin.Inventory')
        .controller('InventoryController', InventoryController);
        InventoryController.$inject = [
            '$state',
            '$scope',
            'InventoryService'
        ];
    function InventoryController($state, $scope, InventoryService) {
        var vm = this;
        vm.inventory = [];
        vm.query = {
          order: 'name',
          limit: 5,
          page: 1
        };

        init();

        function init() {
          vm.getInventory = InventoryService.query()
          .then(function success(response) {
              console.log('response', response);
              vm.inventory = response.data.data;
          },
          function error(e) {
              console.error(e);
          });
        }
        console.log('query', vm.query);
}
})();
