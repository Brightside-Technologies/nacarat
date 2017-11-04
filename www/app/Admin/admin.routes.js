export default function AdminRoutes($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.when('/admin/i', '/login');
  $stateProvider
    /*********************************************/
    /************Login States*********************/
    /*********************************************/
    .state("login", {
      url: "",
      abstract: true,
      resolve: {
        RequireNoAuth: function (AuthenticationService, $state, $q) {
          return AuthenticationService.requireSignIn()
            .then(function (auth) {
                $state.go("admin.root.merchant");
              },
              function (error) {
                return; //$q.reject(error);;
              }
            );
        }
      },
      template: require("../../assets/layouts/login-layout.html")
    })
    .state("login.root", {
      url: "/login",
      views: {
        "": {
          template: require("../Public/Login/login.html"),
          controller: "LoginController as vm"
        }
      }
    })
    /**********************************************/
    /*Private states. Need auth to access these   */
    /**********************************************/
    .state("admin", {
      url: "",
      abstract: true,
      template: '<div ui-view="admin" flex="grow" layout="column" layout-fill class="admin-layout"></div>'
    })
    .state("admin.root", {
      url: "/admin",
      abstract: true,
      resolve: {
        RequireSignIn: function (AuthenticationService) {
          return AuthenticationService.requireSignIn();
        },
        User: function (AuthenticationService, $state, UsersService, MerchantsService) {
          return AuthenticationService.requireSignIn()
            .then(function (auth) {
                return UsersService.get(auth.uid)
                  .then(function (user) {
                    var user = user.data;
                    var firebaseUser = AuthenticationService.getAuthenticatedUser();
                    var nacaratUser = angular.extend({}, user, firebaseUser);
                    return nacaratUser;
                  });
              },
              function (error) {
                console.log("User", error);
                return;
              }
            );
        },
        Merchant: function (User, MerchantsService) {
          return MerchantsService.getByUserId(User.uid)
            .then(function (merchantObj) {
              var merchantId = _.keys(merchantObj.data)[0];
              var merchantData = _.values(merchantObj.data)[0];
              var merchant = angular.extend({}, merchantData, {
                id: merchantId
              });
              return merchant;
            });
        }
      },
      views: {
        admin: {
          template: require("../../assets/layouts/admin-layout.html"),
          controller: function ($state, $mdSidenav, Merchant, AuthenticationService) {
            // NOTE: TEMP controller just to get logout to work
            var vm = this;
            vm.user = Merchant;
            vm.toggleSidenav = function () {
              $mdSidenav("admin-sidenav").toggle();
            };
            vm.logout = function () {
              AuthenticationService.logOut()
                .then(function () {
                    $state.go("login.root");
                  },
                  function error(err) {
                    console.log("err", err);
                  }
                );
            };
          },
          controllerAs: "vm"
        }
      }
    })
    .state("admin.root.merchant", {
      //abstract: true,
      url: "",
      views: {
        "": {
          template: require("./Home/home.html"),
          controller: "AdminHomeController as vm"
        },
        "admin-sidenav": {
          template: require("../../assets/templates/business-sidenav.tmpl.html")
        }
      }
    })
    .state("admin.root.business", {
      abstract: true,
      url: "/business/:businessId",
      resolve: {
        Business: function ($stateParams, BusinessesService) {
          return BusinessesService.get($stateParams.businessId)
            .then(function (businessObj) {
              var businessObject = businessObj.data;
              businessObject.id = $stateParams.businessId;
              return businessObject;
            });
        }
      }
    })
    .state("admin.root.business.profile", {
      url: "/profile",
      views: {
        "@admin.root": {
          template: require("./Profile/profile.html"),
          controller: "ProfileController as vm"
        },
        "admin-sidenav@admin.root": {
          template: require("../../assets/templates/business-sidenav.tmpl.html")
        }
      }
    })
    .state("admin.root.inventory", {
      url: "/inventory",
      views: {
        "": {
          template: require("./Inventory/inventory/inventory.html"),
          controller: "InventoryController as vm"
        }
      }
    })
    .state("admin.root.inventory-details", {
      url: "inventory-details/:inventoryId",
      views: {
        "": {
          template: require("./Inventory/inventory/inventory-details/inventory-details.html"),
          controller: "InventoryDetailsController as vm"
        }
      }
    });
}