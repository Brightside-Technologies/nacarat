HomeController.$inject = [
  '$state',
  'ProductsService'
];

export default function HomeController($state, ProductsService) {
        var vm = this;
        vm.flickityId = 'flickityId';
        vm.slides = [
          {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide1.jpg",
            text: "Hello"
          },
          {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide2.jpg",
            text: "World"
          },
          {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide3.jpg",
            text: "Bye"
          },
          {
            image: "http://cdn.benjamincharity.com/codepen/angular-flickity/slide4.jpg",
            text: "World"
          }
        ];
        vm.products = [];

        // Define custom options for the demo
        vm.flickityOptions = {
          cellSelector: '.demo__slide',
          resize: false,
          setGallerySize: false,
          friction: 0.4,
          selectedAttraction: 0.1,
          bgLazyLoad: true,
        };

        init();

        function init() {
          // ProductsService.query().then(function(products){
          //   console.log('products', products);
          // })
        }
    }
