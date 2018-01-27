// TODO: Skeleton pages OR
// TODO: Use spinner
// TODO: Look into uirouter scrolling directive. The problem to solve is to scroll to the top on state change.
// TODO: Need wo product details pages.  One when looking by vendor and another when looking by product.
// Looking by product should have a list of vendors that sell the product
// TODO: Will need different states for differet product details
// TODO: add $mdToast to all success and error callbacks
// TODO: add check to all Updates: only Update if model has changed
// TODO: Test ExceptionHandler
// TODO: validate phone numbers https://numvalidate.com

// TODO: put all image assets on firebase (or S3)

import logo from "../assets/img/logo.png";
import defaultUser from "../assets/img/user.png";

import "angular-material/angular-material.css";
import "angular-material/layouts/angular-material.layout-attributes.css";
import "angular-material/layouts/angular-material.layouts.css";
import "angular-material/layouts/angular-material.layouts.ie_fixes.css";
import "flickity/dist/flickity.css";
import "angular-material-data-table/dist/md-data-table.css";
import "angular-material-time-picker/dist/md-time-picker.css";
import "../assets/styles/site.css";

import angular from "angular";
import uiRouter from "angular-ui-router";
import ngMaterial from "angular-material";
import ngSanitize from "angular-sanitize";
import mdDataTable from "angular-material-data-table";
import Flickity from "flickity";
import "angular-flickity";
import ngMessages from "angular-messages";
import ngTimePicker from "angular-material-time-picker";
// import 'angularfire';

import Nacarat_Init from "./nacarat.init";
import Nacarat_Routes from "./nacarat.routes";
import Nacarat_Theme from "./config/theme.config";
import Nacarat_Public from "./Public/public.module";
import Nacarat_Admin from "./Admin/admin.module";
import Nacarat_Services from "../assets/services/nacarat.services.module";
import Nacarat_Directives from "../assets/directives/nacarat.directives.module";
import Nacarat_Helpers from "../assets/helpers/helpers.module";
import HttpConfig from "./config/http.config";

angular
    .module("Nacarat", [
        "firebase",
        "bc.Flickity",
        uiRouter,
        ngMessages,
        ngSanitize,
        ngMaterial,
        mdDataTable,
        ngTimePicker,
        Nacarat_Admin,
        Nacarat_Public,
        Nacarat_Helpers,
        Nacarat_Services,
        Nacarat_Directives
    ])
    .constant("config", {
        baseUrl: "http://127.0.0.1:3000"
        //baseUrl: "https://nacarat-2be74.firebaseio.com"
    })
    .config(Nacarat_Theme)
    .config(Nacarat_Routes)
    .config(HttpConfig)
    .run(Nacarat_Init);
