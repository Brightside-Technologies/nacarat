export default function $errorHandler($log, $toastHelper) {
    var errorHandler = _.debounce(
        function(errorResponse) {
            var errorMessage = "";
            if (errorResponse.name && errorResponse.message) {
                errorMessage = errorResponse.name + " " + errorResponse.message;
            } else {
                errorMessage = errorResponse;
            }
            $log.error(errorMessage);
        },
        500,
        true
    );

    return errorHandler;
}
