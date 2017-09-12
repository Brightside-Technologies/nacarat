HomeController.$inject = [
  '$state',
  'ProductsService',
  '$document',
  'FlickityService',
  '$q',
  '$timeout',
  '$scope'
];

// TODO: Reinitialize flickity without groupCells on small screen
export default function HomeController($state, ProductsService, $document, FlickityService, $q, $timeout, $scope) {
  var vm = this;
  vm.slides = [{
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
  vm.productsObj = {};

  var heroCarouselOptions = {
    cellSelector: '.nacarat-carousel__slide',
    wrapAround: true,
    //resize: false,
    //setGallerySize: false,
    //groupCells: 3,
    //freeScroll: true,
    freeScrollFriction: 0.03
  };

  var productsCarouselOptions = {
    cellSelector: '.nacarat-carousel__slide',
    wrapAround: true,
    //resize: false,
    //setGallerySize: false,
    groupCells: 3,
    //freeScroll: true,
    freeScrollFriction: 0.03
  };


  init();

  function init() {
    angular.element($document[0]).ready(function() {
      ProductsService.query()
        .then(function success(response) {
            vm.productsObj = response.data;
            return $q.resolve(vm.productsObj);
          },
          function error(e) {
            console.error(e);
          })
        .then(function(productsArray) {
          var productsCarousel = angular.element(document.getElementById('products-carousel'));
          var heroCarousel = angular.element(document.getElementById('hero-carousel'));
          initCarouselInstance(productsCarousel, heroCarousel);
        });
    });
  }

  function initCarouselInstance(productsCarousel, heroCarousel) {
    $timeout(function() {
      FlickityService.create(productsCarousel[0], productsCarousel[0].id, productsCarouselOptions);
      FlickityService.create(heroCarousel[0], heroCarousel[0].id, heroCarouselOptions);

      $scope.$on('$destroy', function() {
        FlickityService.destroy(productsCarousel[0].id);
        FlickityService.destroy(heroCarousel[0].id);
      });

    })

  }

}
