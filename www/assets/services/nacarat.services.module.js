//TODO: Do I need DailyDeal Service?
import DailyDealsService from './daily-deals.service';
import InventoryService from './inventory.service';
import ProductsService from './products.service';
import BusinessesService from './businesses.service';
import MerchantsService from './merchants.service';
import AuthenticationService from './authentication.service';
import UsersService from './users.service';


export default angular.module('Nacarat_Services', [])
    .service('DailyDealsService', DailyDealsService)
    .service('InventoryService', InventoryService)
    .service('ProductsService', ProductsService)
    .service('BusinessesService', BusinessesService)
    .service('AuthenticationService', AuthenticationService)
    .service('UsersService', UsersService)
    .service('MerchantsService', MerchantsService)
    .name;