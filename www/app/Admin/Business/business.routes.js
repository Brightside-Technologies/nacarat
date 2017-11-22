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
        // .state("admin.root.business.profile.delete-social-media", {
        //     url: "/delete-social-media/:socialMediaType",
        //     onEnter: function ($dialogHelper, $toastHelper, BusinessesService, $stateParams, $state) {
        //         console.log('stateParams', $stateParams)
        //         var businessId = $stateParams.businessId
        //         var socialMediaType = $stateParams.socialMediaType
        //         var opts = {};
        //         //opts.target = ev;
        //         opts.title = "Delete Social Media Entry?";
        //         opts.htmlContent = "<strong>" + socialMediaType + "</strong> entry" + " will be deleted";
        //         opts.ariaLabel = "Delete " + socialMediaType;
        //         opts.okLabel = "Delete";
        //         opts.cancelLabel = "Cancel";
        //         opts.confirm = confirm;
        //         opts.cancel = cancel;
        //         $dialogHelper.showConfirm(opts);

        //         function confirm() {
        //             BusinessesService.profile.deleteSocialMedia(businessId, socialMediaType)
        //                 .then(function success() {
        //                         $state.go('^', {
        //                             businessId: businessId
        //                         });
        //                         $toastHelper.showSuccess('Social media deleted successfully');
        //                     },
        //                     function error(err) {
        //                         $toastHelper.showError('Error has occurred. Please try again');
        //                     });
        //         }

        //         function cancel() {
        //             $state.go('^', {
        //                 businessId: businessId
        //             });
        //         }
        //     }
        // })
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