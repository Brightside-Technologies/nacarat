(function() {
    'use strict';

    angular
        .module('Nacarat')
        .config(Routes);

    Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Routes($stateProvider, $urlRouterProvider) {
        //content
        $urlRouterProvider.otherwise('/');

        $stateProvider
            /**********************************************/
            /*Public states, accessible without logging in*/
            /**********************************************/
            .state('public', {
                url: '',
                abstract: true,
                views: {
                    'public': {
                        templateUrl: 'public/assets/layouts/main-layout.html'
                    }
                }
            })
            .state('public.home', {
                url: '/',
                views: {
                    '@public': {
                        templateUrl: 'public/app/Home/home.html',
                        controller: 'HomeController as vm'
                    }
                }
            })
            // .state('public.search', {
            //     url: '/search',
            //     views: {
            //         '@public': {
            //             templateUrl: 'public/app/Search/search.html',
            //             controller: 'SearchController as vm'
            //         }
            //     }
            // })
            .state('public.about', {
                url: '/about',
                views: {
                    '@public': {
                        templateUrl: 'public/app/AboutUs/about.html',
                        controller: 'AboutController as vm'
                    }
                }
            })
            .state('public.subscribe', {
                url: '/subscribe',
                views: {
                    '@public': {
                        templateUrl: 'public/app/Subscribe/subscribe.html',
                        controller: 'SubscribeController as vm'
                    }
                }
            })
            .state('public.faq', {
                url: '/faq',
                views: {
                    '@public': {
                        templateUrl: 'public/app/FAQ/faq.html',
                        controller: 'FAQController as vm'
                    }
                }
            })
            .state('public.products', {
                url: '/products',
                views: {
                    '@public': {
                        templateUrl: 'public/app/Products/products/products.html',
                        controller: 'ProductsController as vm'
                    }
                }
            })
            .state('public.product-details', {
                url: '/product-details/:id',
                views: {
                    '@public': {
                        templateUrl: 'public/app/Products/product-details/product-details.html',
                        controller: 'ProductDetailsController as vm'
                    }
                }
            })
            // .state('public.login', {
            //     url: '/login',
            //     views: {
            //         '@public': {
            //             templateUrl: 'public/app/Login/login.html',
            //             controller: 'LoginController as vm'
            //         }
            //     }
            // })
            // .state('public.register', {
            //     url: '/register',
            //     views: {
            //         '@public': {
            //             templateUrl: 'public/app/Register/register.html',
            //             controller: 'RegisterController as vm'
            //         }
            //     }
            // })
            /**********************************************/
            /*Public states, accessible without logging in*/
            /**********************************************/
            // .state('private', {
            //     url: '',
            //     abstract: true,
            //     views: {
            //         'private': {
            //             templateUrl: 'public/assets/layouts/main-layout.html',
            //             controller: function($state) {
            //                 /*TEMP controller just to get logout to work*/
            //                 var vm = this;
            //                 vm.logout = function() {
            //                     $state.go('public.login')
            //                 }
            //             },
            //             controllerAs: 'vm'
            //         }
            //     }
            // })
            // .state('private.ask-advice', {
            //     url: '/ask-advice',
            //     views: {
            //         '@private': {
            //             templateUrl: 'public/app/AskAdvice/advice.html',
            //             controller: 'AskAdviceController as vm'
            //         }
            //     }
            // })

    }

})();
