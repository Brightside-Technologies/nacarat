// TODO: Re-style products cards
// TODO: Make cards same height (issue is with the image size probably)
// TODO: Use different layout for home.html.  One with transparent toolbar and image as background
// TODO: Add default image/logo for partners grid
export default function HomeController(
    $state,
    $document,
    $timeout,
    $scope,
    $mdMedia,
    ProductsService,
    BusinessesService,
    FlickityService
) {
    var vm = this;
    vm.heroSlides = [
        {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide1.jpg",
            text: "Lorem Ipsum"
        },
        {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide2.jpg",
            text: "The Oak & the Reeds"
        },
        {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide3.jpg",
            text: "The Town Mouse & the Country Mouse"
        },
        {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide4.jpg",
            text: "The Plane Tree"
        }
    ];
    vm.listOfPartners = [];
    vm.productsObj = {};

    // options to be applied to flickity instances
    var heroCarouselOptions = {
        cellSelector: ".nacarat-carousel__slide",
        wrapAround: true,
        freeScrollFriction: 0.03
    };
    var productsCarouselOptions = {
        cellSelector: ".nacarat-carousel__slide",
        wrapAround: true,
        groupCells: 3,
        freeScrollFriction: 0.03
    };
    var productsCarouselOptionsXS = {
        cellSelector: ".nacarat-carousel__slide",
        wrapAround: true,
        freeScrollFriction: 0.03
    };

    init();

    function init() {
        // wait until document has loaded
        angular.element($document[0]).ready(function() {
            ProductsService.query()
                .then(
                    function success(response) {
                        console.log("response", response);
                        vm.productsObj = response.data;
                        return vm.productsObj;
                    },
                    function error(e) {
                        console.error(e);
                    }
                )
                .then(function(productsArray) {
                    // find DOM elements with which to instantiate flickity instances
                    var productsCarousel = angular.element(document.getElementById("products-carousel"));
                    var heroCarousel = angular.element(document.getElementById("hero-carousel"));
                    initCarouselInstance(productsCarousel, heroCarousel);
                });
        });

        initPartnersGrid();
    }

    function initCarouselInstance(productsCarousel, heroCarousel) {
        $timeout(function() {
            // create flickity instances
            FlickityService.create(productsCarousel[0], productsCarousel[0].id, productsCarouselOptions);
            FlickityService.create(heroCarousel[0], heroCarousel[0].id, heroCarouselOptions);

            // when scope is destroyed, destroy flickity instances
            $scope.$on("$destroy", function() {
                FlickityService.destroy(productsCarousel[0].id);
                FlickityService.destroy(heroCarousel[0].id);
            });

            // watch for changes in viewport size. If screen size is small, recreate
            // products carousel without options.groupCells
            var productsCarouselInstance;
            $scope.$watch(
                function() {
                    return $mdMedia("xs");
                },
                function(isSmallScreen) {
                    if (isSmallScreen) {
                        FlickityService.destroy(productsCarousel[0].id);
                        FlickityService.create(productsCarousel[0], productsCarousel[0].id, productsCarouselOptionsXS);
                    } else {
                        FlickityService.destroy(productsCarousel[0].id);
                        FlickityService.create(productsCarousel[0], productsCarousel[0].id, productsCarouselOptions);
                    }
                }
            );
        });
    }

    function initPartnersGrid() {
        BusinessesService.query().then(
            function(data) {
                vm.listOfPartners = data.data;
            },
            function error(err) {
                console.log(err);
            }
        );
    }
}
