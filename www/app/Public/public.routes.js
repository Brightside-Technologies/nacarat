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
          template: require('../../assets/layouts/main-layout.html')
        }
      }
    })
    .state('public.root.home', {
      url: '/',
      views: {
        '': {
          template: require('./Home/home.html'),
          controller: 'HomeController as vm'
        }
      }
    })
    .state('public.root.about', {
      url: '/about',
      views: {
        '': {
          template: require('./About/about.html'),
          controller: 'AboutController as vm'
        }
      }
    })
    .state('public.root.subscribe', {
      url: '/subscribe',
      views: {
        '': {
          template: require('./Subscribe/subscribe.html'),
          controller: 'SubscribeController as vm'
        }
      }
    })
    .state('public.root.faq', {
      url: '/faq',
      views: {
        '': {
          template: require('./FAQ/faq.html'),
          controller: 'FAQController as vm'
        }
      }
    })
    .state('public.root.products', {
      url: '/products?q',
      views: {
        '': {
          template: require('./Products/products/products.html'),
          controller: 'ProductsController as vm'
        }
      }
    })
    .state('public.root.product-details', {
      url: '/product-details/:productId',
      views: {
        '': {
          template: require('./Products/product-details/product-details.html'),
          controller: 'ProductDetailsController as vm'
        }
      }
    })
    .state('public.root.vendor-details', {
      url: '/vendor-details/:vendorId',
      views: {
        '': {
          template: require('./Vendor/vendor-details/vendor-details.html'),
          controller: 'VendorDetailsController as vm'
        }
      }
    })
    .state('public.root.vendor-list', {
      url: '/vendor-list',
      views: {
        '': {
          template: require('./Vendor/vendor-list/vendor-list.html'),
          controller: 'VendorListController as vm'
        }
      }
    });
}
