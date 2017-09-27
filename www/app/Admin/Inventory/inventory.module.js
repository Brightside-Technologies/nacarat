import InventoryController from './inventory/inventory.controller';
import InventoryDetailsController from './inventory/inventory-details/inventory-details.controller';

export default angular.module('Admin_Inventory', [])
    .controller('InventoryController', InventoryController)
    .controller('InventoryDetailsController', InventoryDetailsController)
    .name;