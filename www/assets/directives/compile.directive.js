CompileDirective.$inject = ['$compile'];

/**
 * @memberof Directives
 * @ngdoc directive
 * @name compile
 * @restrict 'A'
 * @description Source: http://stackoverflow.com/questions/17417607/angular-ng-bind-html-and-directive-within-it
 * @TODO Will need to refactor code to handle Angular 1.6.0 breaking change in $compile service
 * */
export default function CompileDirective($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        // watch the 'compile' expression for changes
        return scope.$eval(attrs.compile);
      },
      function(value) {
        // when the 'compile' expression changes
        // assign it into the current DOM
        element.html(value);

        // compile the new DOM and link it to the current
        // scope.
        // NOTE: we only compile .childNodes so that
        // we don't get into infinite loop compiling ourselves
        $compile(element.contents())(scope);
      }
    );
  };
}
