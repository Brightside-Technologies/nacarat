import angular from 'angular';
import SearchBarDirective from './search-bar/search-bar.directive';
import CompileDirective from './compile.directive';

export default angular.module('Nacarat_Directives', [])
  .directive('searchBar', SearchBarDirective)
  .directive('compile', CompileDirective).name;
