import $dialogHelper from "./dialog.helper";
import $toastHelper from "./toast.helper";
import $addressHelper from "./address.helper";

export default angular
  .module("Nacarat_Helpers", [])
  .service("$dialogHelper", $dialogHelper)
  .service("$toastHelper", $toastHelper)
  .service("$addressHelper", $addressHelper).name;
