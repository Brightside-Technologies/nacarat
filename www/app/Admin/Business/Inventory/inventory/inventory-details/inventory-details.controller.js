export default function InventoryDetailsController($state, $stateParams, $scope, InventoryService) {
    var vm = this;
    var inventoryId = $stateParams.inventoryId;
    console.log("inventoryId", inventoryId);
    vm.inventory = {};

    init();

    function init() {
        InventoryService.get(inventoryId)
            .then(function(inventory) {
                console.log("inventory", inventory);
                vm.inventory = inventory.data;
                console.log("vm.inventory", vm.inventory);
            });

    }
}