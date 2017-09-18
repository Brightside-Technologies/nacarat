export default function AdminRoutes($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    /*********************************************/
    /************Login States*********************/
    /*********************************************/
    .state('login', {
      url: '',
      abstract: true,
      template: require('../../assets/layouts/login-layout.html')
    })
    .state('login.root', {
      url: '/login',
      views: {
        '': {
          template: require('../Public/Login/login.html'),
          controller: 'LoginController as vm'
        }
      }
    })
    /**********************************************/
    /*Private states. Need auth to access these   */
    /**********************************************/
    .state('admin', {
      url: '',
      abstract: true,
      template: '<div ui-view="admin" flex="grow" layout="column" layout-fill class="admin-layout"></div>'
    })
    .state('admin.root', {
      url: '/admin',
      abstract: true,
      resolve: {
        RequireSignIn: function(AuthenticationService) {
          return AuthenticationService.requireSignIn();
        }
      },
      views: {
        'admin': {
          template: require('../../assets/layouts/admin-layout.html'),
          controller: function($state, $mdSidenav, RequireSignIn, AuthenticationService) {
            // NOTE: TEMP controller just to get logout to work
            var vm = this;
            vm.user = AuthenticationService.getAuthenticatedUser();
            vm.toggleSidenav = function() {
              $mdSidenav('admin-sidenav').toggle();
            };
            vm.logout = function() {
              AuthenticationService.signOut()
                .then(function() {
                    $state.go('public.layout.login');
                  },
                  function error(err) {
                    console.log('err', err);
                  });
            };
          },
          controllerAs: 'vm'
        }
      }
    })
    .state('admin.root.home', {
      url: '',
      views: {
        '': {
          template: require('./Home/home.html'),
          controller: 'AdminHomeController as vm'
        }
      }
    })
    .state('admin.root.profile', {
      url: '/profile',
      views: {
        '': {
          template: require('./Profile/profile.html'),
          controller: 'ProfileController as vm'
        }
      }
    })
    .state('admin.root.inventory', {
      url: '/inventory',
      views: {
        '': {
          template: require('./Inventory/inventory/inventory.html'),
          controller: 'InventoryController as vm'
        }
      }
    })
    .state('admin.root.inventory-details', {
      url: 'inventory-details/:inventoryId',
      views: {
        '': {
          template: require('./Inventory/inventory/inventory-details/inventory-details.html'),
          controller: 'InventoryDetailsController as vm'
        }
      }
    });
}
