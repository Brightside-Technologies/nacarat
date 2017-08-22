import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('Public_Login', [])
  .controller('LoginController', LoginController)
  .name;
