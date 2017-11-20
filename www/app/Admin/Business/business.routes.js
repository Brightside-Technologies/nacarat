export default function BusinessRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
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
            },
            views: {
                "admin-sidenav": {
                    template: require("../../../assets/templates/business-sidenav.tmpl.html"),
                    controller: function (Business) {
                        var vm = this;
                        vm.business = Business.profile;
                    },
                    controllerAs: "vm"
                }
            }
        })
        .state("admin.root.business.profile", {
            url: "/profile",
            views: {
                "@admin.root": {
                    template: require("./Profile/profile.html"),
                    controller: "ProfileController as vm"
                }
            }
        })
        .state("admin.root.business.inventory", {
            url: "/inventory",
            views: {
                "@admin.root": {
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