import angular from 'angular';
import DailyDealsService from './daily-deals.service';
import InventoryService from './inventory.service';
import ProductsService from './products.service';
import VendorService from './vendors.service';
import AuthenticationService from './authentication.service';


export default angular.module('Nacarat_Services', [])
  .service('DailyDealsService', DailyDealsService)
  .service('InventoryService', InventoryService)
  .service('ProductsService', ProductsService)
  .service('VendorService', VendorService)
  .service('AuthenticationService', AuthenticationService)
  .name;
