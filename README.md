# Nacarat: ShopLocal

Web application that will promote the online presence of small businesses. Main functionality will include the ability for a shopper to search for items by keyword, category, or vendor. The application will have an administrative module, allowing vendors to register and upload their products/inventory.

### Documentation
Documentation regarding project data models and API information can be found in [API.md](API.md).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
* Install GIT (the link below will begin an automatic download of executable, installation file)
```
https://git-scm.com/download/win
```
* Install Node.Js
```
https://nodejs.org/en/download/
```

### Installing

See steps below to get a development env running

* Clone the this repository to your local machine

```
git clone https://github.com/abstract-tesseract/nacarat.git
```

* While in project root directory, install NPM dependencies

```
npm install
```

* Run the project with local web server using `webpack-dev-server` at `localhost:8080/`

```
npm run dev
```

* Run the project with local web server using `webpack-dashboard` at `localhost:8080/`
> **NOTE**: Very resource intensive but provides a better visual representation.  Check out [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard) for details

```
npm run dev-dash
```



## Running the tests

Explain how to run the automated tests for this system

## Deployment
Before deploying to any evironment, you need to build the project.  This process takes all files in `www` folder as source and outputs an `index.html` file along with a concatenated and minified `css` and `js` and an `assets` folder file into `dist` folder.  The contents of `dist` is what ends up being deployed
```
npm run build
```
>**TODO**: Need need environment variables.  Try [`gulp-ng-config`](https://github.com/ajwhite/gulp-ng-config). Tutorial [here](https://scotch.io/tutorials/properly-set-environment-variables-for-angular-apps-with-gulp-ng-config).

## Built With

* [nodejs](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [AngularJS](https://angularjs.org/) - Declarative templates with data-binding, MVW, MVVM, MVC.
* [WebPack](https://webpack.js.org/) - A module bundler for modern JavaScript applications.
* [FireBase](https://firebase.google.com/) - A Free Platform to Help Develop and Grow Your Mobile Apps.


## Authors

* **Diego Bernal** - *Lead Developer* - [go-diego](https://github.com/go-diego)
* **Isaias Dominguez** - *Developer* - [Isaias68](https://github.com/Isaias68)
* **Juan Villagomez** - *Developer* - [jvillagomez](https://github.com/jvillagomez)


## License

_TODO_

## Acknowledgments

* Stack Overflow
* Our Moms
