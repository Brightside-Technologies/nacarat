VendorService.$inject = [
  '$http',
  'config'
];

export default function VendorService($http, config) {
  var baseUrl = config.baseUrl;
  var service = this;

  service.query = function() {
    var url = baseUrl + '/vendors.json';
    return $http({
      url: url,
      method: 'GET'
    });
  };

  service.get = function(vendorId) {
    var url = baseUrl + '/vendors/' + vendorId + '.json';
    return $http({
      url: url,
      method: 'GET'
    });
  };
}
