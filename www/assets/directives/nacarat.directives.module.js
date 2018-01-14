import SearchBarDirective from "./search-bar/search-bar.directive";
import CompileDirective from "./compile.directive";
import FooterDirective from "./footer/footer.directive";
import AddressDirective from "./address/address.directive";
import PhoneDirective from "./phone/phone.directive";
import FabDirective from "./fab/fab.directive";

export default angular
    .module("Nacarat_Directives", [])
    .directive("searchBar", SearchBarDirective)
    .directive("compile", CompileDirective)
    .directive("mdFooter", FooterDirective)
    .directive("phone", PhoneDirective)
    .directive("fab", FabDirective)
    .directive("address", AddressDirective).name;
