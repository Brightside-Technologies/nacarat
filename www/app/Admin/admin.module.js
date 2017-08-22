import angular from 'angular';
import Admin_Home from './Home/home.module';
import Admin_Delivery from './Delivery/delivery.module';
import Admin_Inventory from './Inventory/inventory.module';
import Admin_Profile from './Profile/profile.module';
import Admin_Settings from './Settings/settings.module';

angular
  .module('Nacarat_Admin', [
    Admin_Home,
    Admin_Delivery,
    Admin_Inventory,
    Admin_Profile,
    Admin_Settings
  ]);
