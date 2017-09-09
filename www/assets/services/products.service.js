ProductsService.$inject = [
  '$q',
  '$http',
  'config',
  '$firebaseArray'
];

export default function ProductsService($q, $http, config, $firebaseArray) {
  // var url = baseUrl + '/products/:productId'
  var baseUrl = config.baseUrl;

  var service = this;

  service.query = function() {
    var url = baseUrl + '/products.json';
    return $http({
      url: url,
      method: 'GET'
    });
  };

  service.get = function(productId) {
    var url = baseUrl + '/products/' + productId + '.json';
    return $http({
      url: url,
      method: 'GET'
    });
  };

  service.search = function(queryString) {
    // TODO: Use correct url for query strings for Firebase
    // TODO: figure out firebase filtering

    //var url = baseUrl + '/products?q=' + queryString;
    var url = baseUrl + '/products.json';

    return $http({
        url: url,
        method: 'GET'
      })
      .then(function(searchResponse) {
        return $q(function(resolve, reject) {
          var parsedProducts = [];
          angular.forEach(searchResponse.data, function(value, key, obj) {
            if (value.productName.indexOf(queryString) >= 0) {
              this.push({
                "text": value.productName
              });
            }
          }, parsedProducts);
          resolve(parsedProducts);
        });
      });
  };

  service.queryBySuggestion = function(suggestionText) {
    // TODO: Need firebase filtering
    var url = baseUrl + '/products.json';
    return $http({
        url: url,
        method: 'GET'
      })
      .then(function(response) {
        return $q(function(resolve, reject) {
          var parsedProductsObj = {};
          parsedProductsObj.data = {};
          angular.forEach(response.data, function(value, key, obj) {
            if (value.productName.indexOf(suggestionText) >= 0) {
              this.data[key] = value;
              console.log(this);
            }
          }, parsedProductsObj);
          resolve(parsedProductsObj);
        });
      });
  };

}
