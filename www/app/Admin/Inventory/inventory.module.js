import angular from 'angular';
import InventoryController from './inventory/inventory.controller';

export default angular.module('Admin_Inventory', [])
  .controller('InventoryController', InventoryController)
  .name;
