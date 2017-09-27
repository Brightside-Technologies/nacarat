import VendorListController from './vendor-list/vendor-list.controller';
import VendorDetailsController from './vendor-details/vendor-details.controller';

export default angular.module('Public_Vendor', [])
    .controller('VendorListController', VendorListController)
    .controller('VendorDetailsController', VendorDetailsController).name;