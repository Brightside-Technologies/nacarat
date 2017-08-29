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
        console.log("product", product);

        var products = product.data.data;
        vm.product = products[productId];
        console.log("vm.product", vm.product);
        console.log("$stateParams", $stateParams);
      });
  }
}
