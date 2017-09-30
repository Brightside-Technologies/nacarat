export default function InventoryService($http, config) {
  var baseUrl = config.baseUrl;

  var service = this;

  service.query = function() {
    var url = baseUrl + '/vendors/bd9f7a6e-2372-4699-8c71-274de3da1269/inventories.json'
    return $http({
      url: url,
      method: 'GET'
    });
  }

  service.get = function(inventoryId) {
    var url = baseUrl + '/vendors/bd9f7a6e-2372-4699-8c71-274de3da1269/inventories/' + inventoryId + '.json'
    return $http({
      url: url,
      method: 'GET'
    });
  }

}
