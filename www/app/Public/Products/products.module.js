import angular from 'angular';
import ProductsController from './products/products.controller';
import ProductDetailsController from './product-details/product-details.controller';

export default angular.module('Public_Products', [])
  .controller('ProductsController', ProductsController)
  .controller('ProductDetailsController', ProductDetailsController).name;
