import $dialogHelper from "./dialog.helper";
import $toastHelper from "./toast.helper";
import $addressHelper from "./address.helper";
import $phoneHelper from "./phone.helper";
import $requestErrorHandler from "./request-error-handler";
import $errorHandler from "./error-handler";

export default angular
    .module("Nacarat_Helpers", [])
    .service("$dialogHelper", $dialogHelper)
    .service("$toastHelper", $toastHelper)
    .service("$addressHelper", $addressHelper)
    .service("$phoneHelper", $phoneHelper)
    .factory("$errorHandler", $errorHandler)
    .factory("$requestErrorHandler", $requestErrorHandler).name;
