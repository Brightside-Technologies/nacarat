import Public_Login from './Login/login.module';
import Public_Home from './Home/home.module';
import Public_Products from './Products/products.module';
import Public_Vendor from './Vendor/vendor.module';
import Public_Subscribe from './Subscribe/subscribe.module';
import Public_FAQ from './FAQ/faq.module';
import Public_About from './About/about.module';
import Public_Routes from './public.routes.js';

export default angular.module('Nacarat_Public', [
        Public_Login,
        Public_Home,
        Public_Products,
        Public_Vendor,
        Public_Subscribe,
        Public_FAQ,
        Public_About
    ])
    .config(Public_Routes)
    .name;