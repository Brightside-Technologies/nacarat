import angular from 'angular';
import HomeController from './home.controller';

export default angular.module('Public_Home', [])
  .controller('HomeController', HomeController)
  .name;
