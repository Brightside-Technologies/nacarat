export default function $dialogHelper($mdDialog, $mdMedia, $state) {

  var helper = this;

  helper.showCustom = function (options) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: options.controller,
      controllerAs: "vm",
      template: options.template,
      templateUrl: options.templateUrl,
      parent: angular.element(document.body),
      targetEvent: options.target,
      openFrom: options.openFrom,
      closeTo: options.closeTo,
      clickOutsideToClose: false,
      fullscreen: useFullScreen,
      locals: options.locals,
      multiple: options.multiple
    });
  };

  helper.showConfirm = function (options) {
    $mdDialog.show(
        $mdDialog.confirm()
        .title(options.title)
        .htmlContent(options.htmlContent)
        .textContent(options.textContent)
        .ariaLabel(options.ariaLabel)
        .targetEvent(options.target)
        .ok(options.okLabel)
        .cancel(options.cancelLabel)
      )
      .then(function confirm() {
          (options.confirm || angular.noop)();
        },
        function cancel() {
          //cancel
          (options.cancel || $mdDialog.cancel)();
        });
  };

  helper.hide = function () {
    $mdDialog.hide();
  };

  helper.cancel = function () {
    $mdDialog.cancel();
  };

  /**
   * show prompt dialog, based on the preset prompt dialog in Angular Material.  In this one, user is able to pass options to control the template
   * e.g - validation, adding theming classes, choosing different input types, etc
   */
  helper.showPrompt = function (options) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    var promptTemplate = [
      '<md-dialog md-theme="{{ vm.theme || vm.defaultTheme }}" aria-label="{{ vm.ariaLabel }}" ng-class="vm.css">',
      '    <form name="vm.form" novalidate>',
      '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">',
      '    <h2 class="md-title">{{ ::vm.title }}</h2>',
      '    <div class="md-dialog-content-body">',
      '      <p>{{::vm.textContent}}</p>',
      '    </div>',
      '    <md-input-container class="md-prompt-input-container" ng-if="vm.input.type === \'text\'">',
      '       <label>{{::vm.input.label}}</label>',
      '       <input name="input" md-no-asterisk ng-keypress="vm.keypress($event)" md-autofocus ng-model="vm.modelValue" ' +
      '             placeholder="{{::vm.input.placeholder}}" attributes attributes-list="vm.input.attributes">',
      '       <validation-message input-name="vm.form.input" ></validation-message>',
      '</md-input-container>',
      '  </md-dialog-content>',
      '  <md-dialog-actions>',
      '       <md-button ng-click="vm.cancelAction()" class="md-cancel-button" ng-class="vm.cancelBtn.cssClass">',
      '      {{ vm.cancelBtn.text || \'Cancel\' }}',
      '    </md-button>',
      '    <md-button ng-click="vm.confirmAction()" class="md-confirm-button" ng-class="vm.confirmBtn.cssClass" ng-disabled="(vm.enableSubmit == false || vm.form.$invalid)">',
      '      {{ vm.confirmBtn.text || \'Ok\' }}',
      '    </md-button>',
      '  </md-dialog-actions>',
      '    </form>',
      '</md-dialog>'
    ].join('').replace(/\s\s+/g, '');

    $mdDialog.show({
        controller: function PromptDialogController($scope, locals) {

          var templateVm = locals.templateVm;
          var vm = this;
          vm.form = {};
          vm.title = templateVm.title;
          vm.ariaLabel = templateVm.ariaLabel;
          vm.textContent = templateVm.textContent;
          vm.title = templateVm.title;
          vm.input = templateVm.input;
          vm.cancelBtn = templateVm.cancelBtn;
          vm.confirmBtn = templateVm.confirmBtn;
          vm.enableSubmit = false;
          vm.modelValue = vm.input.initialValue || "";
          vm.confirmAction = confirmAction;
          vm.cancelAction = cancelAction;
          vm.keypress = keypress;

          var originalValue = vm.input.initialValue;
          $scope.$watch('vm.modelValue', function (n, o) {

            var newValueTocompare = '';
            if (typeof originalValue == 'number') {
              newValueTocompare = parseInt(n);
            } else {
              newValueTocompare = n;
            }

            if (newValueTocompare !== originalValue && n) {
              vm.enableSubmit = true;
            } else {
              vm.enableSubmit = false;
            }
          });

          function keypress(e) {
            if (e.keyCode === 13) {
              if (vm.form.$valid)
                (vm.confirmBtn.action || $mdDialog.hide)(vm.modelValue);
            }
          }

          function confirmAction() {
            if (vm.form.$valid)
              (vm.confirmBtn.action || $mdDialog.hide)(vm.modelValue);
          }

          function cancelAction() {
            (vm.cancelBtn.action || $mdDialog.cancel)();
          }

        },
        controllerAs: "vm",
        template: promptTemplate,
        parent: angular.element(document.body),
        targetEvent: options.target,
        openFrom: options.openFrom,
        closeTo: options.closeTo,
        clickOutsideToClose: false,
        fullscreen: useFullScreen,
        locals: options.locals
      })
      .then(function confirm(val) {
          console.log("dONE");
          (options.confirmCb || $mdDialog.hide)(val);
        },
        function cancel(val) {
          (options.cancelCb || $mdDialog.cancel)(val);
        });
  };

}