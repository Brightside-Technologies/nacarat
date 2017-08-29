ProductsService.$inject = [
  '$q',
  '$http',
  'config'
];

export default function ProductsService($q, $http, config) {
  // var url = baseUrl + '/products/:productId'
  var baseUrl = config.baseUrl;

  var service = this;

  service.query = function() {
    var url = baseUrl + '/products'
    return $http({
      url: url,
      method: 'GET'
    });
  }

  service.get = function(productId) {
    // var url = baseUrl + '/products/:productId'
    var url = baseUrl + '/products'
    return $http({
      url: url,
      method: 'GET'
    });
  }

  service.search = function(queryString) {
    // TODO: Use correct url for query strings for Firebase
    // TODO: Temporary promise return to parse products and return by name
    // API should support this at some point.
    var url = baseUrl + '/products?q=' + queryString;
    return $http({
        url: url,
        method: 'GET'
      })
      .then(function(searchResponse) {
        return $q(function(resolve, reject) {
          var parsedProducts = [];
          angular.forEach(searchResponse.data.data, function(value, key, obj) {
            if (value.productName.indexOf(queryString) >= 0) {
              console.log("PUSH");
              this.push({
                "text": value.productName
              });
            }
          }, parsedProducts);
          resolve(parsedProducts);
        })
      });
  }

  service.queryBySuggestion = function(suggestionText) {
    // TODO: Temporarily use query method and filter out results by suggestionText
    // API should be able to handle this at some point.
    var url = baseUrl + '/products';
    return $http({
        url: url,
        method: 'GET'
      })
      .then(function(response) {
        return $q(function(resolve, reject) {
          var parsedProductsObj = {};
          parsedProductsObj.data = {};
          angular.forEach(response.data.data, function(value, key, obj) {
            if (value.productName.indexOf(suggestionText) >= 0) {
              this.data[key] = value;
              console.log(this);
            }
          }, parsedProductsObj);
          resolve(parsedProductsObj);
        })
      });
  }

}
