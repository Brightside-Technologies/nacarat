export default function AdminHomeController(Merchant) {
    var vm = this;
    vm.businesses = Merchant.businesses;
    init();

    function init() {

    }
}