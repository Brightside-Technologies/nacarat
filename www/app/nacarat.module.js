import logo from '../assets/img/logo.png';
import defaultUser from '../assets/img/user.png';

import 'angular-material/angular-material.css';
import 'angular-material/layouts/angular-material.layout-attributes.css';
import 'angular-material/layouts/angular-material.layouts.css';
import 'angular-material/layouts/angular-material.layouts.ie_fixes.css';
import 'flickity/dist/flickity.css';
import 'angular-material-data-table/dist/md-data-table.css';
import '../assets/styles/site.css';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import mdDataTable from 'angular-material-data-table';
import Flickity from 'flickity';
import 'angular-flickity';
// import 'angularfire';

import Nacarat_Init from './nacarat.init';
import Nacarat_Theme from './nacarat.theme.js';
import Nacarat_Admin from './Admin/admin.module';
import Nacarat_Public from './Public/public.module';
import Nacarat_Services from '../assets/services/nacarat.services.module';
import Nacarat_Directives from '../assets/directives/nacarat.directives.module';
import Nacarat_Helpers from '../assets/helpers/helpers.module';

angular
  .module('Nacarat', [
    'firebase',
    uiRouter,
    ngSanitize,
    ngMaterial,
    'bc.Flickity',
    mdDataTable,
    Nacarat_Admin,
    Nacarat_Public,
    Nacarat_Helpers,
    Nacarat_Services,
    Nacarat_Directives
  ])
  .constant('config', {
    //"baseUrl": "http://127.0.0.1:3000"
    "baseUrl": "https://nacarat-2be74.firebaseio.com"
  })
  .config(Nacarat_Theme)
  .run(Nacarat_Init);
