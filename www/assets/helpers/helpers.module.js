(function() {
    'use strict';

    angular
        .module('Nacarat.Helpers', []);
})();

import angular from 'angular';
import $dialogHelper from './dialog.helper';


export default angular.module('Nacarat_Helpers', [])
  .service('$dialogHelper', $dialogHelper).name;
