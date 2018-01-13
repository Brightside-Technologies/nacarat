import $errorHandler from "./error-handler";

export default function $requestErrorHandler($log, $toastHelper, $state, $errorHandler) {
    function parseError(errorResponse) {
        var defaultClientErrorMessage = "Error has occurred, please try again";
        var actionInResponseToErrorFn = angular.noop;

        if (errorResponse.name && errorResponse.message) {
            var errorMessageForApp = errorResponse.name + " " + errorResponse.message;
            console.log("errorResponse", errorResponse);
            return $errorHandler(errorResponse);
            //return handleError(defaultClientErrorMessage, errorMessageForApp, actionInResponseToErrorFn);
        }
        var responseErrorMessage = "";
        var isErrorResponseCustom = !!errorResponse.customErrorMessage;
        var doesResponseHaveConfig = !!errorResponse.config;
        var errorResponseStatus = errorResponse.status;
        var errorResponseMethod = doesResponseHaveConfig ? errorResponse.config.method.toLowerCase() : "";
        var isCurrentStateLogin = $state.current.name.indexOf("login") >= 0;
        var doesResponseHaveErrorMessage =
            errorResponse.data && errorResponse.data.ErrorDetails && errorResponse.data.ErrorDetails[0].ErrorMessage;
        var errorMessage = doesResponseHaveErrorMessage ? errorResponse.data.ErrorDetails[0].ErrorMessage : "";
        // if Unauthorized and on Login Page
        if (errorResponseStatus == 401 && isCurrentStateLogin) {
            responseErrorMessage = "Incorrect username or password";
            // if Unauthorized
        } else if (errorResponseStatus == 401) {
            responseErrorMessage = "Not authorized";
            actionInResponseToErrorFn = function() {
                $state.go("public.unauthorized");
            };
            // if Bad Request GET
        } else if (errorResponseStatus == 400 && errorResponseMethod == "get") {
            responseErrorMessage = "An error occurred while requesting data, please try again.";
            // if Bad Request POST or PUT
        } else if (errorResponseStatus == 400 && (errorResponseMethod == "post" || errorResponseMethod == "put")) {
            responseErrorMessage = errorMessage || "An error occurred while processing request, please try again.";
        } else if (isErrorResponseCustom) {
            responseErrorMessage = errorResponse.customErrorMessage;
        } else {
            responseErrorMessage = errorMessage;
        }

        var errorForClient = responseErrorMessage || defaultClientErrorMessage;

        if (doesResponseHaveConfig) {
            var errorForApp = {};
            errorForApp.status = errorResponse.status;
            errorForApp.statusText = errorResponse.statusText;
            errorForApp.method = doesResponseHaveConfig ? errorResponse.config.method : "";
            errorForApp.url = errorResponse.config.url;
            errorForApp.message = errorMessage;
            errorForApp.logMessage =
                errorResponse.config.method +
                " " +
                errorResponse.config.url +
                " " +
                errorResponse.status +
                " (" +
                errorResponse.statusText +
                ")" +
                " " +
                errorMessage;
        }

        var errorMessageForApp = errorForApp && errorForApp.logMessage ? errorForApp.logMessage : responseErrorMessage;
        return handleError(errorForClient, errorMessageForApp, actionInResponseToErrorFn);
    }

    function handleError(forClientMessage, forAppMessage, actionInResponseToErrorFn) {
        logError({
            forClient: forClientMessage,
            forApp: forAppMessage
        });

        actionInResponseToErrorFn();
    }

    function showErrorToUser(errorMessage) {
        $toastHelper.showError(errorMessage);
    }

    function logErrorToServer(errorMessage) {
        $log.error(errorMessage);
    }

    function logError(errorMessage) {
        logErrorToServer(errorMessage.forApp);
        showErrorToUser(errorMessage.forClient);
    }

    var errorHandler = _.debounce(
        function(errorResponse) {
            $log.error(errorResponse);
            parseError(errorResponse);
        },
        500,
        true
    );

    return errorHandler;
}
