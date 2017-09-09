// TODO: Move firebase config to nacarat-fire.service.js with an init method

export default function Run(firebase, $rootScope, $state, $stateParams, $mdSidenav, $mdComponentRegistry){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  var config = {
    apiKey: "AIzaSyDRuo6qjELmEFIwEHZkD9t81BoHKMfW4mY",
    authDomain: "nacarat-2be74.firebaseapp.com",
    databaseURL: "https://nacarat-2be74.firebaseio.com",
    projectId: "nacarat-2be74",
    //storageBucket: "nacarat-2be74.appspot.com",
    //messagingSenderId: "421681862561"
  };
  firebase.initializeApp(config);

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams, options) {
      var sidenav = $mdComponentRegistry.get('admin-sidenav');
      if (sidenav && $mdSidenav('admin-sidenav').isOpen()) {
        $mdSidenav('admin-sidenav').close();
      }
    });
}
