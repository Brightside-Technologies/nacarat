(function() {
    'use strict';

    angular
        .module('Nacarat.Services')
        .service('DailyDealsService', DailyDealsService);

    DailyDealsService.$inject = [
        '$resource'
    ];

    function DailyDealsService($resource) {
        //TODO: Define url in app.constant()
        var url = "";
        var DailyDealsResource = $resource(url + '/daily-deals/:vendorId', {
            vendorId: '@vendorId'
        }, {
            query: {
                isArray: true
            }
        });

        return DailyDealsResource;
    }
})();
