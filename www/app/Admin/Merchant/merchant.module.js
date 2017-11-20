import Businesses from './Businesses/businesses.module';
//import Profile from './Profile/profile.module';
//import Settings from './Settings/settings.module';
import Routes from './merchant.routes';

export default angular.module('Merchant', [
        Businesses
    ])
    .config(Routes)
    .name;