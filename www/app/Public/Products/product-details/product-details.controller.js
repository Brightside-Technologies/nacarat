// TODO: Implement carousel for product images
// TODO: Do I need a helper for Flickity? Or do I need to refactor only?
// TODO: Need a default image/icon for vendors with no logo
// TODO: Need to add street number for address in product.seller.address
export default function ProductDetailsController($scope, $timeout, $state, $stateParams, $document, FlickityService, ProductsService) {
    var productId = $stateParams.productId;
    var vm = this;
    vm.productObject = {};
    var productImagesCarouselOptions = {
        cellSelector: '.nacarat-carousel__slide',
        wrapAround: true,
        freeScrollFriction: 0.03
    };

    init();

    function init() {
        // wait until document has loaded
        angular.element($document[0]).ready(function() {
            ProductsService.get(productId)
                .then(function(product) {
                        vm.productObject = product.data;
                        return vm.productObject;
                    },
                    function error(err) {
                        console.log("err", err)
                    })
                .then(function(productObject) {
                    // find DOM elements with which to instantiate flickity instances
                    var productImagesCarousel = angular.element(document.getElementById('product-images-carousel'));
                    initCarouselInstance(productImagesCarousel);
                });
        });
    }

    function initCarouselInstance(carousel) {
        $timeout(function() {

            // create flickity instances
            FlickityService.create(carousel[0], carousel[0].id, productImagesCarouselOptions);

            // when scope is destroyed, destroy flickity instances
            $scope.$on('$destroy', function() {
                FlickityService.destroy(carousel[0].id);
            });

        });
    }
}