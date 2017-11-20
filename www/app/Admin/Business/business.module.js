import Inventory from './Inventory/inventory.module';
import Profile from './Profile/profile.module';
import Settings from './Settings/settings.module';
import Routes from './business.routes';

export default angular.module('Business', [
        Inventory,
        Profile,
        Settings
    ])
    .config(Routes)
    .name;