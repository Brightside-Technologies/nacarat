export default function AdminRoutes($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.when('/admin/i', '/login');
    $stateProvider
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
                RequireSignIn: function(AuthenticationService) {
                    return AuthenticationService.requireSignIn();
                },
                User: function(AuthenticationService, $state, UsersService, MerchantsService, $errorHandler) {
                    return AuthenticationService.requireSignIn()
                        .then(function(auth) {
                            return UsersService.get(auth.uid).then(function(user) {
                                var user = user.data;
                                var firebaseUser = AuthenticationService.getAuthenticatedUser();
                                var nacaratUser = angular.extend({}, user, firebaseUser);
                                return nacaratUser;
                            });
                        })
                        .catch($errorHandler);
                },
                Merchant: function($errorHandler, User, MerchantsService) {
                    return MerchantsService.getByUserId(User.uid)
                        .then(function(merchantObj) {
                            var merchantId = _.keys(merchantObj.data)[0];
                            var merchantData = _.values(merchantObj.data)[0];
                            var merchant = angular.extend({}, merchantData, {
                                id: merchantId
                            });
                            return merchant;
                        })
                        .catch($errorHandler);
                }
            },
            views: {
                admin: {
                    template: require("../../assets/layouts/admin-layout.html"),
                    controller: function($state, $mdSidenav, AuthenticationService) {
                        // NOTE: TEMP controller just to get logout to work
                        var admin = this;
                        admin.toggleSidenav = function() {
                            $mdSidenav("admin-sidenav").toggle();
                        };
                        admin.logout = function() {
                            AuthenticationService.logOut().then(
                                function() {
                                    $state.go("login.root");
                                },
                                function error(err) {
                                    console.log("err", err);
                                }
                            );
                        };
                    },
                    controllerAs: "admin"
                }
            }
        });
}
