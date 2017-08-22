export default function Routes($stateProvider, $urlRouterProvider) {
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
          template: require('../assets/layouts/main-layout.html')
        }
      }
    })
    .state('public.root.home', {
      url: '/',
      views: {
        '': {
          template: require('./Public/Home/home.html'),
          controller: 'HomeController as vm'
        }
      }
    })
    .state('public.root.about', {
      url: '/about',
      views: {
        '': {
          template: require('./Public/About/about.html'),
          controller: 'AboutController as vm'
        }
      }
    })
    // .state('public.root.subscribe', {
    //   url: '/subscribe',
    //   views: {
    //     '': {
    //       templateUrl: require('./app/Public/Subscribe/subscribe.html'),
    //       controller: 'SubscribeController as vm'
    //     }
    //   }
    // })
    // .state('public.root.faq', {
    //   url: '/faq',
    //   views: {
    //     '': {
    //       template: require('./app/Public/FAQ/faq.html'),
    //       controller: 'FAQController as vm'
    //     }
    //   }
    // })
    // .state('public.root.products', {
    //   url: '/products?q',
    //   views: {
    //     '': {
    //       template: require('./app/Public/Products/products/products.html'),
    //       controller: 'ProductsController as vm'
    //     }
    //   }
    // })
    // .state('public.root.product-details', {
    //   url: '/product-details/:productId',
    //   views: {
    //     '': {
    //       template: require('./app/Public/Products/product-details/product-details.html'),
    //       controller: 'ProductDetailsController as vm'
    //     }
    //   }
    // })
    // .state('public.root.vendor-details', {
    //   url: '/vendor-details/:vendorId',
    //   views: {
    //     '': {
    //       template: require('./app/Public/Vendor/vendor-details/vendor-details.html'),
    //       controller: 'VendorDetailsController as vm'
    //     }
    //   }
    // })
    // .state('public.root.vendor-list', {
    //   url: '/vendor-list',
    //   views: {
    //     '': {
    //       template: require('./app/Public/Vendor/vendor-list/vendor-list.html'),
    //       controller: 'VendorListController as vm'
    //     }
    //   }
    // })
    /*********************************************/
    /************Login States*********************/
    /*********************************************/
    // .state('login', {
    //   url: '',
    //   abstract: true,
    //   template: require('./assets/layouts/login-layout.html')
    // })
    // .state('login.root', {
    //   url: '/login',
    //   views: {
    //     '': {
    //       template: require('./app/Public/Login/login.html'),
    //       controller: 'LoginController as vm'
    //     }
    //   }
    // })
    /**********************************************/
    /*Private states. Need auth to access these   */
    /**********************************************/
    // .state('admin', {
    //   url: '',
    //   abstract: true,
    //   template: '<div ui-view="admin" flex="grow" layout="column" layout-fill class="admin-layout"></div>'
    // })
    // .state('admin.root', {
    //   url: '/admin',
    //   abstract: true,
    //   views: {
    //     'admin': {
    //       templateUrl: './assets/layouts/admin-layout.html',
    //       controller: function($state, $mdSidenav) {
    //         //TEMP controller just to get logout to work
    //         var vm = this;
    //         vm.toggleSidenav = function() {
    //           $mdSidenav('admin-sidenav').toggle();
    //         }
    //         vm.logout = function() {
    //           $state.go('public.layout.login');
    //         };
    //       },
    //       controllerAs: 'vm'
    //     }
    //   }
    // })
    // .state('admin.root.home', {
    //   url: '',
    //   views: {
    //     '': {
    //       templateUrl: './app/Admin/Home/home.html',
    //       controller: 'AdminHomeController as vm'
    //     }
    //   }
    // })
    // .state('admin.root.profile', {
    //   url: '/profile',
    //   views: {
    //     '': {
    //       templateUrl: './app/Admin/Profile/profile.html',
    //       controller: 'ProfileController as vm'
    //     }
    //   }
    // })
    // .state('admin.root.inventory', {
    //   url: '/inventory',
    //   views: {
    //     '': {
    //       templateUrl: './app/Admin/Inventory/inventory/inventory.html',
    //       controller: 'InventoryController as vm'
    //     }
    //   }
    // });
}
