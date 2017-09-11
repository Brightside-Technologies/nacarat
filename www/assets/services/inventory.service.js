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
    var url = baseUrl + '/vendors/8b9846d7-9df4-440c-8bbc-88b8a9fc7217/inventories.json'
    return $http({
      url: url,
      method: 'GET'
    });
  }

  service.get = function(inventoryId) {
    // var url = baseUrl + '/products/:productId'
    var url = baseUrl + '/vendors/8b9846d7-9df4-440c-8bbc-88b8a9fc7217/inventories/' + inventoryId + '.json'
    return $http({
      url: url,
      method: 'GET'
    });
  }

}
