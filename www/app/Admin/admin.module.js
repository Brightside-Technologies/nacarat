import Business from './Business/business.module';
import Merchant from './Merchant/merchant.module';
import Routes from './admin.routes';
import Init from './admin.init';

export default angular.module('Nacarat_Admin', [
        Merchant,
        Business
    ])
    .config(Routes)
    .run(Init)
    .name;