# Nacarat: ShopLocal

Web application that will promote the online presence of small businesses. Main functionality will include the ability for a shopper to search for items by keyword, category, or vendor. The application will have an administrative module, allowing vendors to register and upload their products/inventory.

### Data Structure

Documentation regarding project data models and API information can be found in [API.md](docs/API.md).

## Prerequisites

* Install Git (the link below will begin an automatic download of executable, installation file)

```
https://git-scm.com/download/win
```

> _Note_: I try to follow **GitFlow** branching model. Become familiar with it [here](http://nvie.com/posts/a-successful-git-branching-model/)

* Install Node.Js

```
https://nodejs.org/en/download/
```

## Getting Started

[Nacarat](https://github.com/abstract-tesseract/nacarat) contains all the client side code. For developing, you will also need to download [nacarat-local-server](https://github.com/abstract-tesseract/nacarat-local-server). This repository tries to mock the behavior of Firebase and allows us to test locally without having to hit Firebase directly and run up our data quota. In other words, **always** point at the local Express server provided by **nacarat-local-server**.

### Installing the client side

* Clone the this repository to your local machine

```
git clone https://github.com/abstract-tesseract/nacarat.git
```

* While in project root directory, install NPM dependencies

```
npm install
```

* Run the project with local web server at `localhost:8080/`

```
npm run start:nacarat
```

### Installing the test server

* Clone the this repository to your local machine

```
https://github.com/abstract-tesseract/nacarat-local-server
```

* While in project root directory, install NPM dependencies

```
npm install
```

* Start up the server

  ```
  node index.js
  ```

  * I prefer to use `nodemon`. It's best if you install it globally `npm install -g nodemon` then you can do:

```
  nodemon index.js
```

## Deployment

This project uses **Webpack** as a bundler. That is, while developing, you will be working in the `www` directory. When we are ready to deploy a version live, we need to build the project. The build process takes the files in `www` and produces the contents of `dist`. The contents of `dist` are usually concatenated and minified. `dist` is what ends up being deployed.

```
npm run build:development
```

> **TODO**: Need need environment variables. Try [`gulp-ng-config`](https://github.com/ajwhite/gulp-ng-config). Tutorial [here](https://scotch.io/tutorials/properly-set-environment-variables-for-angular-apps-with-gulp-ng-config).

## Built With

* [nodejs](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [AngularJS](https://angularjs.org/) - Declarative templates with data-binding, MVW, MVVM, MVC.
* [Webpack](https://webpack.js.org/) - A module bundler for modern JavaScript applications.
* [Firebase](https://firebase.google.com/) - A Free Platform to Help Develop and Grow Your Mobile Apps.

* [Netlify](https://www.netlify.com/) - Netlify is where the front end code is hosted. The code is checked into Github and is automatically deployed to Netlify. The latest version of the project can be seen at http://nacarat.netlify.com.

_Note_: If you want to use `scss`, I use `gulp-sass` to compile scss to css. `npm run sass` compile it all for you. However, to use it on your Windows machine, you need to do the following:

```
npm install -g node-gyp
```

Then, from an elevated PowerShell (as Admin)

```
npm install --global --production
```

Finally, you can install `gulp-sass`.

_Note_ `gulp-sass` is alread included in the `package.json` but running `npm install` will not install it if the previous steps haven't been done.

```
npm install gulp-sass
```

## Authors

* **Diego Bernal** - _Lead Developer_ - [go-diego](https://github.com/go-diego)

## License

_TODO_
