export default function UsersService($http, config) {
    var baseUrl = config.baseUrl;
  
    var service = this;
  
    service.get = function(userId) {
      var url = baseUrl + '/users/' + userId + '.json'
      return $http({
        url: url,
        method: 'GET'
      });
    }
  }