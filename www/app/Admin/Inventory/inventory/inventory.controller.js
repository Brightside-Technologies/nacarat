export default function InventoryController($state, $scope, InventoryService, RequireSignIn) {
    var vm = this;
    vm.selected = [];
    vm.filters = [];
    vm.inventories = [];
    vm.searachInventory = {};
    var bookmark;
    vm.query = {
        order: 'productName',
        pageLimit: 5,
        pageNumber: 1,
        filter: '',
    };
    vm.getInventory = getInventory;
    vm.inventorySearch = inventorySearch;



    $scope.$watch('search.filter', function(newValue, oldValue) {
        if (newValue != undefined) {
            vm.filters = newValue.split(" ");
        }
    })



    init();

    function init() {
        InventoryService.query()
            .then(function success(response) {
                    vm.inventory = response.data;
                    angular.forEach(vm.inventory, function(value, key) {
                        value.id = key;
                        vm.inventories.push(value);
                    });
                },
                function error(e) {
                    console.error(e);
                });
    }

    function getInventory(order) {
        vm.promise = InventoryService.query();
    }

    function inventorySearch(inventoryItem) {
        vm.searachInventory.status = true;
        angular.forEach(vm.filters, function(value, key) {
            vm.searachInventory.tempStatus = false;
            angular.forEach(inventoryItem, function(value2, key) {
                var dataType = typeof(value2);
                if (dataType == "string" && (!value2.includes('object'))) {
                    if (value2.toLowerCase().includes(value)) {
                        vm.searachInventory.tempStatus = true;
                    }
                } else if (dataType == "object") {
                    var num = value2.toString();
                    if (num.includes(value)) {
                        vm.searachInventory.tempStatus = true;
                    }
                }
            });
            vm.searachInventory.status = vm.searachInventory.status & vm.searachInventory.tempStatus;
        });

        return vm.searachInventory.status;
    };



}