export default function AuthenticationService($http, $firebaseAuth, $q, config, firebase) {
    var firebaseConfig = {
        apiKey: "AIzaSyDRuo6qjELmEFIwEHZkD9t81BoHKMfW4mY",
        authDomain: "nacarat-2be74.firebaseapp.com",
        databaseURL: "https://nacarat-2be74.firebaseio.com",
        projectId: "nacarat-2be74",
        //storageBucket: "nacarat-2be74.appspot.com",
        //messagingSenderId: "421681862561"
    };
    firebase.initializeApp(firebaseConfig);
    var firebaseAuthObject = $firebaseAuth();
    var user = {};
    var service = this;

    service.register = register;
    service.logInWithUsernamePassword = logInWithUsernamePassword;
    service.logOut = logOut;
    service.isUserLoggedIn = isUserLoggedIn;
    service.signInWithPopup = signInWithPopup;
    service.getAuthenticatedUser = getAuthenticatedUser;
    service.requireSignIn = requireSignIn;
    service.waitForSignIn = waitForSignIn;
    service.onAuthStateChanged = firebaseAuthObject.$onAuthStateChanged;
    service.authenticatedUser = firebaseAuthObject.$getAuth();

    //service.sendWelcomeEmail = sendWelcomeEmail;

    function register(user) {
        return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }

    function logInWithUsernamePassword(user) {
        return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
    }

    function logOut() {
        return firebaseAuthObject.$signOut();
    }

    function isUserLoggedIn() {
        var userLoggedIn = firebaseAuthObject.$getAuth();
        console.log('userLoggedIn', userLoggedIn);
        return userLoggedIn && userLoggedIn.uid ? true : false;
    }

    function getAuthenticatedUser(authenticatedUser) {
        var user = {};
        var nacaratAuthenticatedUser = firebaseAuthObject.$getAuth();
        if (nacaratAuthenticatedUser) {
            user = {
                //credential: loginResponse.credential,
                uid: nacaratAuthenticatedUser.uid,
                displayName: nacaratAuthenticatedUser.displayName,
                email: nacaratAuthenticatedUser.email,
                emailVerified: nacaratAuthenticatedUser.emailVerified,
                photo: nacaratAuthenticatedUser.photoURL,
                isAnonymous: nacaratAuthenticatedUser.isAnonymous,
                refreshToken: nacaratAuthenticatedUser.refreshToken
            };
        }
        return user;
    }

    function signInWithPopup(provider) {
        return firebaseAuthObject.$signInWithPopup(provider);
    }

    function requireSignIn() {
        return firebaseAuthObject.$requireSignIn(false);
    }

    function waitForSignIn() {
        return firebaseAuthObject.$waitForSignIn();
    }

    function onAuthStateChanged() {
        firebaseAuthObject.$onAuthStateChanged;
    }

    // function sendWelcomeEmail(emailAddress) {
    //   firebaseDataService.emails.push({
    //     emailAddress: emailAddress
    //   });
    // }

}