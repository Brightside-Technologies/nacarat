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
          .state('public', {
                url: '',
                abstract: true,
                template: '<div ui-view="public" flex="grow" layout="column" layout-fill></div>'
            })
            /**********************************************/
            /*Public states, accessible without logging in*/
            /**********************************************/
            .state('public.root', {
                url: '',
                abstract: true,
                views: {
                    'public': {
                        templateUrl: 'www/assets/layouts/main-layout.html'
                    }
                }
            })
            .state('public.root.home', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/Home/home.html',
                        controller: 'HomeController as vm'
                    }
                }
            })
            .state('public.root.about', {
                url: '/about',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/AboutUs/about.html',
                        controller: 'AboutController as vm'
                    }
                }
            })
            .state('public.root.subscribe', {
                url: '/subscribe',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/Subscribe/subscribe.html',
                        controller: 'SubscribeController as vm'
                    }
                }
            })
            .state('public.root.faq', {
                url: '/faq',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/FAQ/faq.html',
                        controller: 'FAQController as vm'
                    }
                }
            })
            .state('public.root.products', {
                url: '/products',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/Products/products/products.html',
                        controller: 'ProductsController as vm'
                    }
                }
            })
            .state('public.root.product-details', {
                url: '/product-details/:productId',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/Products/product-details/product-details.html',
                        controller: 'ProductDetailsController as vm'
                    }
                }
            })
            .state('public.root.vendor-details', {
                url: '/vendor-details/:vendorId',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/Vendor/vendor-details/vendor-details.html',
                        controller: 'VendorDetailsController as vm'
                    }
                }
            })
            .state('public.root.vendor-list', {
                url: '/vendor-list',
                views: {
                    '': {
                        templateUrl: 'www/app/Public/Vendor/vendor-list/vendor-list.html',
                        controller: 'VendorListController as vm'
                    }
                }
            })

            /**********************************************/
            /*Private states. Need auth to access these   */
            /**********************************************/
            .state('admin', {
                  url: '',
                  abstract: true,
                  template: '<div ui-view="admin" flex="grow" layout="column" layout-fill></div>'
              })
              .state('admin.root-login', {
                  url: '',
                  abstract: true,
                  views: {
                      'admin': {
                          templateUrl: 'www/assets/layouts/login-layout.html',
                      }
                  }
              })
              .state('admin.root-login.login', {
                  url: '/login',
                  views: {
                      '': {
                          templateUrl: 'www/app/Public/Login/login.html',
                          controller: 'LoginController as vm'
                      }
                  }
              })
              .state('admin.root', {
                  url: '/admin',
                  abstract: true,
                  views: {
                      'admin': {
                          templateUrl: 'www/assets/layouts/admin-layout.html',
                          controller: function($state) {
                              //TEMP controller just to get logout to work
                              var vm = this;
                              vm.logout = function() { $state.go('public.layout.login'); };
                          },
                          controllerAs: 'vm'
                      }
                  }
              })
              .state('admin.root.home', {
                  url: '',
                  views: {
                      '': {
                          templateUrl: 'www/app/Admin/Home/home.html',
                          controller: 'AdminHomeController as vm'
                      }
                  }
              })
              .state('admin.root.profile', {
                  url: '/profile',
                  views: {
                      '': {
                          templateUrl: 'www/app/Admin/Profile/profile.html',
                          controller: 'ProfileController as vm'
                      }
                  }
              })
              .state('admin.root.inventory', {
                  url: '/inventory',
                  views: {
                      '': {
                          templateUrl: 'www/app/Admin/Inventory/inventory/inventory.html',
                          controller: 'InventoryController as vm'
                      }
                  }
              });
    }

})();
