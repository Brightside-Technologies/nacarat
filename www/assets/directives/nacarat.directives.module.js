import angular from 'angular';
import SearchBarDirective from './search-bar/search-bar.directive';
import CompileDirective from './compile.directive';
import FooterDirective from './footer/footer.directive';

export default angular.module('Nacarat_Directives', [])
  .directive('searchBar', SearchBarDirective)
  .directive('compile', CompileDirective)
  .directive('mdFooter', FooterDirective).name;
