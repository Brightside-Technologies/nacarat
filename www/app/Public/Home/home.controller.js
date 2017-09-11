HomeController.$inject = [
  '$state',
  'ProductsService',
  '$document',
  'FlickityService'
];

export default function HomeController($state, ProductsService, $document, FlickityService) {
  var vm = this;
  vm.flickityId = 'heroCarousel';
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
  vm.products = [];

  var heroCarouselOptions = {
    cellSelector: '.hero__carousel-slide',
    wrapAround: true,
    resize: false,
    setGallerySize: false,
    freeScroll: true,
    freeScrollFriction: 0.03
  };

  var productsCarouselOptions = {
    cellSelector: '.products__carousel-slide',
    wrapAround: true,
    resize: false,
    setGallerySize: false,
    freeScroll: true,
    freeScrollFriction: 0.03
  };


  init();

  function init() {
    angular.element($document[0]).ready(function() {

      // ProductsService.query()
      //   .then(function success(response) {
      //       console.log('response', response);
      //       vm.products = response.data;
      //     },
      //     function error(e) {
      //       console.error(e);
      //     });

      var element = angular.element(document.getElementById('hero-carousel-slides'));
      FlickityService.create(element[0], element[0].id, heroCarouselOptions);
      // var products = angular.element(document.getElementById('products-carousel-slides'));
      // FlickityService.create(products[0], products[0].id, productsCarouselOptions);
    })
  }
}
