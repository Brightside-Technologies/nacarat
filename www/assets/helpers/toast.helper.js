export default function $toastHelper($mdToast) {
    var body = angular.element(document).find("html");
    console.log("body", body);
    var customToastTemplate = [
        "<md-toast>",
        '<md-icon style="padding-right: 5px" md-colors="{color: {{vm.mdColors}}}">{{vm.mdIconContent}}</md-icon>',
        '<span class="md-toast-text">{{vm.textContent}}</span>',
        '<md-button class="md-highlight" ng-class="vm.highlightClass" ng-click="vm.dismiss()">OK</md-button>',
        "</md-toast>"
    ]
        .join("")
        .replace(/\s\s+/g, "");

    var helper = this;

    helper.showSuccess = showSuccess;
    helper.showError = showError;

    function showSuccess(textContent) {
        // HACK: hide any instance of $mdToast before showing another one
        // showing more than one throws an error
        // Could we have a queue of them?
        $mdToast.hide();

        var successToastOptions = {
            template: customToastTemplate,
            //autoWrap: true,
            hideDelay: false,
            position: "bottom left",
            //toastClass: 'class'
            locals: {
                textContent: textContent
            },
            controller: SuccessToastController,
            bindToController: true,
            controllerAs: "vm",
            parent: body
        };

        function SuccessToastController(locals) {
            var vm = this;
            vm.textContent = locals.textContent;
            vm.highlightClass = "md-accent";
            vm.mdColors = "'teal-500'";
            vm.mdIconContent = "check";
            vm.dismiss = function() {
                $mdToast.hide();
            };
        }

        return $mdToast.show(successToastOptions);
        //.then(function (response) {
        //});
    }

    function showError(textContent) {
        // HACK: hide any instance of $mdToast before showing another one
        // showing more than one throws an error
        // Could we have a queue of them?
        $mdToast.hide();

        var errorToastOptions = {
            template: customToastTemplate,
            //autoWrap: true,
            hideDelay: false,
            position: "bottom left",
            //toastClass: 'class'
            locals: {
                textContent: textContent
            },
            controller: ErrorToastController,
            bindToController: true,
            controllerAs: "vm",
            parent: body
        };

        function ErrorToastController(locals) {
            var vm = this;
            vm.textContent = locals.textContent;
            vm.highlightClass = "md-warn";
            vm.mdColors = "'red-500'";
            vm.mdIconContent = "close";
            vm.dismiss = function() {
                $mdToast.hide();
            };
        }

        return $mdToast.show(errorToastOptions);
        //.then(function (response) {
        //});
    }
}
