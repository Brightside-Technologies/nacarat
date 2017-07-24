(function() {
  "use strict";

  angular.module('Nacarat.Helpers').service('$dialogHelper', $dialogHelper);

  $dialogHelper.$inject = ['$mdDialog', '$mdMedia', '$state'];

  function $dialogHelper($mdDialog, $mdMedia, $state) {

    var service = this;

    service.showCustom = function(options) {
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

    service.showConfirm = function(options) {
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
            options.confirm();
          },
          function cancel() {
            //cancel
          });
    };

    service.hide = function() {
      $mdDialog.hide();
    };

    service.cancel = function() {
      $state.get($state.current.name).data.dialog = false;
      $mdDialog.cancel();
    };

    /**
     * @description show prompt dialog, based on the preset prompt dialog in Angular Material.  In this one, user is able to pass options to control the template
     * e.g - validation, adding theming classes, choosing different input types, etc.
     * <code>options</code> passed in should be of the following form
     * <pre>
     *  var promptDialogOptions = {};
        promptDialogOptions.target = ev;
        promptDialogOptions.closeTo = ev;
        promptDialogOptions.openTo = ev;
        promptDialogOptions.locals = {
            templateVm: {
                title: 'Title of prompt dialog',
                textContent: 'Text content of prompt dialog',
                ariaLabel: 'Aria lable of prompt dialog',
                input: {
                    type: 'text', // type of the input. In the near future, <code>select</code> and <code>checkbox</code> will be supported
                    label: 'label', // label for <code>input[type='text']</code>
                    placeholder: '', // placeholder of <code>input[type='text']</code>
                    initialValue: 0,  // initial value of <code>input[type='text']</code>
                    attributes: [{ 'integer': function (val) { return val > 0 } }, { 'required': true }] // list of attributes and respective values to attach to to <code>input[type='text']</code> via <code>attributes</code> directive and <code>attributes-list</code>
                },
                confirmBtn: {
                    text: 'Update', // text to display in confirm button. Defaults to 'OK'
                    cssClass: 'md-primary', // class to add to confirm button
                    action: confirmFn // function to execute when the confirm button is pressed.  Default calls <code>$mdDialog.hide(val)</code>
                },
                cancelBtn: {
                    text: 'Cancel' // text to display in confirm button. Defaults to 'CANCEL'
                    cssClass: '', // class to add to cancel button
                    action: cancelFn // function to execute when the cancel button is pressed.  Default calls <code>$mdDialog.abort()</code>
                }
            }
        }
        promptDialogOptions.confirmCb = function () { console.log("CONFIRM CB") }; // function to execute after confirmation is done. Default is <code>angular.noop()</code>
        promptDialogOptions.cancelCb = function () { console.log("CANCEL CB") }; // function to execute after cancellation is done. Default is <code>angular.noop()</code>
     * </pre>
     * @todo Add support for different input types e.g - select, checkbox (or toggle maybe)
     * <code>attributes</code> directive needs work. Validation issues when dynamically adding validation attribute directives
     */
    service.showPrompt = function(options) {

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
            $scope.$watch('vm.modelValue', function(n, o) {

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
            })

            function keypress(e) {
              if (e.keyCode === 13) {
                if (vm.form.$valid)
                  (vm.confirmBtn.action || $mdDialog.hide)(vm.modelValue)
              }
            }

            function confirmAction() {
              if (vm.form.$valid)
                (vm.confirmBtn.action || $mdDialog.hide)(vm.modelValue)
            }

            function cancelAction() {
              (vm.cancelBtn.action || $mdDialog.cancel)();
            };

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

})();
