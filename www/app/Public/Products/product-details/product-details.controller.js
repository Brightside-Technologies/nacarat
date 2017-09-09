ProductDetailsController.$inject = [
  '$state',
  '$stateParams',
  'ProductsService',
];

export default function ProductDetailsController($state, $stateParams, ProductsService) {
  var productId = $stateParams.productId;
  console.log("productId", productId);
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
