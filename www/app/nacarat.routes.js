export default function NacaratRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix("");
  $urlRouterProvider.otherwise("/not-found");
  $stateProvider
    .state("login", {
      url: "",
      abstract: true,
      resolve: {
        RequireNoAuth: function(AuthenticationService, $state, $q) {
          return AuthenticationService.requireSignIn().then(
            function(auth) {
              $state.go("admin.root.merchant.businesses");
            },
            function(error) {
              return; //$q.reject(error);;
            }
          );
        }
      },
      template: require("../assets/layouts/login-layout.html")
    })
    .state("login.root", {
      url: "/login",
      views: {
        "": {
          template: require("./Public/Login/login.html"),
          controller: "LoginController as vm"
        }
      }
    })
    .state("error", {
      abstract: true,
      url: "",
      template: '<div ui-view="error" flex="grow" layout="column"></div>'
    })
    .state("error.root", {
      url: "/error",
      views: {
        error: {
          template: require("../assets/layouts/500.html")
        }
      }
    })
    .state("not-found", {
      abstract: true,
      url: "",
      template: '<div ui-view="not-found" flex="grow" layout="column"></div>'
    })
    .state("not-found.root", {
      url: "/not-found",
      views: {
        "not-found": {
          template: require("../assets/layouts/404.html")
        }
      }
    });
}
