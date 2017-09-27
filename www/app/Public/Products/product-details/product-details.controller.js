export default function ProductDetailsController($state, $stateParams, ProductsService) {
  var productId = $stateParams.productId;
  var vm = this;
  vm.product = {};

  init();

  function init() {
    ProductsService.get(productId)
      .then(function(product) {
        vm.product = product.data;
      });
  }
}
