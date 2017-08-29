InventoryService.$inject = [
  '$resource',
  '$http',
  'config'
];

export default function InventoryService($resource, $http, config) {
  // var url = baseUrl + '/products/:productId'
  var baseUrl = config.baseUrl;

  var service = this;

  service.query = function() {
    var url = baseUrl + '/inventory'
    return $http({
      url: url,
      method: 'GET'
    });
  }

  service.get = function(inventoryId) {
    // var url = baseUrl + '/products/:productId'
    var url = baseUrl + '/inventory'
    return $http({
      url: url,
      method: 'GET'
    });
  }

}
