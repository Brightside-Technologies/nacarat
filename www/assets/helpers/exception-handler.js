export default function NacaratConfig($provide) {
    $provide.decorator("$exceptionHandler", function($delegate) {
        return function(exception, cause) {
            var exceptionSplitArray = [];
            var exceptionObject = {};
            if (typeof exception == "string") {
                console.log("exceptionSplitArray", exceptionSplitArray);
                exceptionSplitArray = exception.split(":");
                if (exceptionSplitArray.length <= 2) {
                    exceptionObject.name = "Error";
                    exceptionObject.message = exceptionSplitArray[exceptionSplitArray.length - 1];
                } else {
                    exceptionObject.name = exceptionSplitArray[0];
                    var exceptionSplitArrayWithoutFirst = _.rest(exceptionSplitArray, 1);
                    var exceptionDataToString = exceptionSplitArrayWithoutFirst.join(":");
                    var exceptionDataToJson = JSON.parse(exceptionDataToString);
                    exceptionObject.message = exceptionDataToJson.data.Message;
                    //console.log('exceptionDataToJson', exceptionDataToJson);
                }
            } else {
                exceptionObject.name = exception.name;
                exceptionObject.message = exception.message;
            }

            console.log("exceptionObject", exceptionObject);
            $delegate(exceptionObject.name + ": " + exceptionObject.message, cause);
        };
    });
}
