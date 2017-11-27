export default function $addressHelper($http) {
  //var authId = "34224525918469434";
  var authId = "3aced146-1319-b2ca-f7ab-6a7a2ac6d9df";
  var authToken = "RcuW3MB3mTQxKTBeXArr";

  var helper = this;

  helper.getSuggestions = getSuggestions;
  helper.getAddress = getAddress;
  helper.validResponseToDTO = validResponseToDTO;
  helper.invalidResponseToDTO = invalidResponseToDTO;

  function getSuggestions(value) {
    var url = "https://us-autocomplete.api.smartystreets.com/suggest";

    return $http({
      method: "GET",
      url: url,
      params: {
        "auth-id": authId,
        "auth-token": authToken,
        prefix: value
      }
    }).then(
      function(response) {
        //console.log("HTTP RESPONSE", response);
        return response.data.suggestions || [];
      },
      function error(err) {
        console.log("HTTP ERROR", err);
      }
    );
  }

  function getAddress(address) {
    var url = "https://us-street.api.smartystreets.com/street-address";

    return $http({
      method: "GET",
      url: url,
      params: {
        "auth-id": authId,
        "auth-token": authToken,
        street: address.street_line,
        city: address.city,
        state: address.state,
        candidates: 10
      }
    }).then(
      function(response) {
        var addressResponse = "";
        if (response.data.length) {
          //address is valid
          addressResponse = response.data[0];
        } else {
          // address is invalide
          addressResponse = "INVALID_ADDRESS";
        }
        return addressResponse;
      },
      function error(err) {
        console.log("err", err);
      }
    );
  }

  function validResponseToDTO(validAddressObject) {
    var addressDTO = {
      delivery_line_1: validAddressObject.delivery_line_1,
      last_line: validAddressObject.last_line,
      latitude: validAddressObject.metadata.latitude,
      longitude: validAddressObject.metadata.longitude,
      county_name: validAddressObject.metadata.county_name,
      components: {
        primary_number: validAddressObject.components.primary_number,
        street_name: validAddressObject.components.street_name,
        street_suffix: validAddressObject.components.street_suffix,
        city_name: validAddressObject.components.city_name,
        state_abbreviation: validAddressObject.components.state_abbreviation,
        zipcode: validAddressObject.components.zipcode,
        plus4_code: validAddressObject.components.plus4_code
      }
    };

    return addressDTO;
  }

  function invalidResponseToDTO(invalidAddressObject) {
    var addressComponentsArray = invalidAddressObject.street_line.split(" ");
    var addressDTO = {
      delivery_line_1: invalidAddressObject.street_line,
      last_line: invalidAddressObject.city + " " + invalidAddressObject.state,
      latitude: null,
      longitude: null,
      county_name: null,
      components: {
        primary_number: addressComponentsArray[0] || null,
        street_name: addressComponentsArray[1] || null,
        street_suffix: null,
        city_name: invalidAddressObject.city,
        state_abbreviation: invalidAddressObject.state,
        zipcode: null,
        plus4_code: null
      }
    };

    return addressDTO;
  }
}
