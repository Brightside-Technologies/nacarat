export default function MerchantRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("admin.root.merchant", {
            abstract: true,
            url: "",
            views: {
                "admin-sidenav": {
                    template: require("../../../assets/templates/merchant-sidenav.tmpl.html"),
                    controller: function (Merchant) {
                        var vm = this;
                        vm.user = Merchant;
                    },
                    controllerAs: "vm"
                }
            }
        })
        .state("admin.root.merchant.businesses", {
            url: "/businesses",
            views: {
                "@admin.root": {
                    template: require("./Businesses/businesses.html"),
                    controller: "BusinessesController as vm"
                }
            }
        })
}