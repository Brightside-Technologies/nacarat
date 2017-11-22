import $dialogHelper from './dialog.helper';
import $toastHelper from './toast.helper';

export default angular.module('Nacarat_Helpers', [])
  .service('$dialogHelper', $dialogHelper)
  .service('$toastHelper', $toastHelper)
  .name;