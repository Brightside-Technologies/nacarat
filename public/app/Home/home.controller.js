(function() {
    'use strict';

    angular
        .module('Home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
        '$state'
    ];

    function HomeController($state) {
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
        }
    }
})();
