<table border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td width="120" align="center">
            <a href="http://www.hapijs.com" title="hapi.js">
                <img src="https://raw.github.com/hapijs/hapi/master/images/hapi.png" width="100" height="70"/>
            </a>
        </td>
        <td width="120" align="center">
            <a href="http://www.gulpjs.com" title="gulp.js">
                <img height="70" width="31" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
            </a>
        </td>
        <td width="120" align="center">
            <a href="http://bower.io" title="bower.io">
                <img width="100" height="88" src="http://bower.io/img/bower-logo.png">
            </a>
        </td>
    </tr>
</table>

## Hapi.js Project Structure and Implementation

This project describes the structure of an [Hapi.js](http://www.hapijs.com) server implementation.

We will explain all phases of the project integration, configuration and libraries used, scripts for the continued development and packaging of the production application.

When I have some interesting features to offer, I will include them in this project to involve you.

Feel free to give me your opinion and let me share integration ideas to grow the project and will make everybody **Hapi**.

### Contents

* [Installation](#installation)
    * [Client/Server application](#clientserver-application)
    * [Server application](#server-application)
* [Getting started](#getting-started)
    * [Client/Server method](#clientserver-method)
    * [Server method](#server-method)
* [Client Libraries](#client-libraries)
    * [Bower](#bower)
    * [Bootstrap](#bootstrap)
    * [Modernizr](#modernizr)
* [Server Libraries](#server-libraries)
    * [Hapi](#hapi)
    * [Gulp](#gulp)
    * [Boom](#boom)
    * [Good](#good)
    * [Hoek](#hoek)
    * [Joi](#joi)
    * [Handlebars](#handlebars)
    * [Node Config Manager](#node-config-manager)
    * [Hapi Basic i18n](#hapi-basic-i18n)
* [Test Libraries](#test-libraries)
    * [Lab](#lab)
    * [Code](#code)
* [Server details](#server-details)
* [Client details](#client-details)
* [Gulp scripts](#gulp-scripts)
* [Packaging](#packaging)
* [TODO](#todo)
* [Release History](#release-history)
* [License](#license)

## Installation

You must clone the project:

```javascript
$ cd /path/to/workspace

$ git clone git@github.com:njl07/hapi-structure.git
```

After that the project structure will be in your worskpace. 

Project contains `client` and `server` elements. 

If you want **only** use the `sever` side of the project, the following files and folders will be useless:

* `./client`
* `./config/../design.json`
    * `./index.js` should be override to delete reference in `internals.configs` variable
    * the same in `./config/plugin.json`
* `./lib/design`
* `./lib/hello/../world`

These files contain all the elements for HTML display.

When the structure is OK for you, you must install all dependencies.

### Client/Server application

For this part, you must install `npm` and `bower` packages:
  
```javascript
$ cd /path/to/workspace/hapi-structure

$ npm install && bower install
```

Folders `node_modules` and `bower_components` will be created.

### Server application

For this part, you must only install `npm` packages:
  
```javascript
$ cd /path/to/workspace/hapi-structure

$ npm install
```

Folder `node_modules` will be created.

## Getting started

After installation, you can launch the project in `continuous development` method. 

This means that when you make a change in the ***server*** and / or ***client*** code, application and browser will be **automatically reloaded**.

### Client/Server method
 
```javascript
$ cd /path/to/workspace/hapi-structure

$ gulp
```

When you launch the project in **client/server** method, browser will be launched **automatically** and views will be displayed at: `http://localhost:5000`

If you update anything in your server (`api`, `configuration`, ...) or client (`html`, `css`, ...) code, changes will be **displayed** at the screen and your `API` will be **reloaded**.

### Server method

```javascript
$ cd /path/to/workspace/hapi-structure

$ gulp serve:api-application
```

When you launch the project in **server** method, browser will **not** be launched. If you want displayed `API` result in your browser, go to: `http://127.0.0.1:7080`

If you update anything in your server (`api`, `configuration`, ...), `API` will be **reloaded** but change will **not be displayed** in your browser.
 
If client parts are in your project, you can displayed `HTML` contents in your browser but if changes are made, you must **reload manually** the page to display updates.

## Client Libraries

### Bower

<a href="http://bower.io" title="bower.io">
    <img width="100" height="88" src="http://bower.io/img/bower-logo.png">
</a>

A **package manager** for the web.

### Bootstrap

<a href="http://getbootstrap.com" title="bootstrap">
    <img width="100" height="46" src="http://bmdm.com/wp-content/uploads/bootstrap.png">
</a>

The most popular **HTML**, **CSS**, and **JS framework** for developing **responsive**, **mobile** first projects on the web.

### Modernizr

<a href="http://modernizr.com" title="modernizr">
    <img width="100" height="26" src="http://zurb.com/blog_uploads/0000/1410/feature-targeting-modernizr.jpg">
</a>

**JavaScript** library that detects **HTML5** and **CSS3** features in the user’s browser.

## Server Libraries

### Hapi

<a href="http://www.hapijs.com" title="hapi.js">
    <img src="https://raw.github.com/hapijs/hapi/master/images/hapi.png" width="100" height="70"/>
</a>

A rich **framework** for building **applications** and **services**.

### Gulp

<a href="http://www.gulpjs.com" title="gulp.js">
    <img height="70" width="31" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
</a>

**Automate** and **enhance** your workflow.

### Boom

<a href="https://github.com/hapijs/boom" title="boom">
    <img height="32" width="100" src="https://raw.github.com/hapijs/boom/master/images/boom.png">
</a>

Provides a set of **utilities** for returning **HTTP errors**.

### Good

<a href="https://github.com/hapijs/good" title="good">
    <img height="43" width="100" src="https://raw.github.com/hapijs/good/master/images/good.png">
</a>

[Hapi.js](http://www.hapijs.com) process **monitoring**.

### Hoek

<a href="https://github.com/hapijs/hoek" title="hoek">
    <img height="32" width="100" src="https://raw.github.com/hapijs/hoek/master/images/hoek.png">
</a>

Node **utilities** shared amongst the extended [Hapi.js](http://www.hapijs.com) universe.

### Joi

<a href="https://github.com/hapijs/joi" title="joi">
    <img height="75" width="100" src="https://raw.github.com/hapijs/joi/master/images/joi.png">
</a>

Object **schema description** language and **validator** for JavaScript objects.

### Handlebars

<a href="http://handlebarsjs.com" title="handlebars">
    <img height="61" width="100" src="http://blog.comperiosearch.com/wp-content/uploads/2012/09/handlebars_logo.png">
</a>

Provides the power necessary to let you build **semantic templates** effectively with no frustration.

To show [Hapi.js](http://www.hapijs.com) integration follow this [link](http://hapijs.com/api#serverviewsoptions)

### Node Config Manager

A [configuration manager](https://github.com/Valko54/node-config-manager) for NodeJS. It helps you to organize your project and the different **configurations** of your **environments**.

### Hapi Basic i18n

[Translations](https://github.com/ubaltaci/hapi-basic-i18n) management for [Hapi.js](http://www.hapijs.com)

## Test Libraries

### Lab

<a href="https://github.com/hapijs/lab" title="lab">
    <img height="63" width="100" src="https://raw.github.com/hapijs/lab/master/images/lab.png">
</a>

Simple **test utility** for node.

### Code

[BDD](https://github.com/hapijs/code) assertion library.

## Server details

* The **main application** file is `index.js`. It registers all **plugins** and **libraries** and launches [Hapi.js](http://www.hapijs.com) **server**.
* `translations` folder contains languages files. **One language** for **one file**.
* `test` folder contains all scripts to **test application**.
* `lib` folder contains all custom plugins with 2 required:
    * `design` folder is the plugin to display **client contents** in the browser. (if `client` folder doesn't exist, plugin can be **deleted**)
    * `i18n` folder is the plugin to manage **i18n** data.
* `gulp` folder contains all scripts to **automate** and **enhance** the workflow. `gulpfile.js` is **required** to launch these scripts.
* `config` folder contains all **configuration files** for all **environment**.
    * `api.json` => configuration for the **server**
    * `design.json` => configuration for the **client**
    * `i18n.json` => configuration for **translations**
    * `plugin.json` => configuration for custom **plugins**
    * `route.json` => configuration for **API** routes
    * `good.js` => configuration for **logging**


To display the result of an **API** call, follow these steps:   

* Launch server

```javascript
$ cd /path/to/workspace/hapi-structure

$ gulp or gulp:api-application 
```

* Call specific route in your **browser**, **cURL** or with **Postman**

```javascript
GET /v1/hello/json HTTP/1.1
Host: 127.0.0.1:7080
Content-Type: application/json

{
  "statusCode": 200,
  "message": "Welcome NJL on Hapi.js Project Structure!"
}
```

* You can add **query parameter** to change user name

```javascript
GET /v1/hello/json?user=Akanass HTTP/1.1
Host: 127.0.0.1:7080
Content-Type: application/json

{
  "statusCode": 200,
  "message": "Welcome Akanass on Hapi.js Project Structure!"
}
```

This code uses `lib/hello` **plugin** with `json` **route** and **controller**.

Message in the response is displayed by `lib/i18n` **plugin**.

## Client details

All clients data are in `client` folder :

* `assets` folder contains **images** and **fonts** for the front application
* `scripts` folder contains **custom scripts** for the front application
* `styles` folder contains **stylesheets** for the front application
    * `index.scss` => **SASS** file for **global layout** of the front application.
    * `vendor.scss` => **SASS** file for all **bower components** of the front application. **Doesn't insert** something **manually** in this file. If CSS component is **missing**, use **bower override** instead of. 
    * `_*.scss` => **SASS** file for **specific** page of the front application. These files will be **automatically** inserted in `index.scss` during execution and packaging.
* `views` folder contains **HTML** files for the front application
    * `layout` folder contains **global layout** file for the front application (`layout.html`). The tag `{{{content}}}` would not be deleted, it's the **dynamic insertion** of the content page. 
    * `partials` folder contains **generic layout** files for the front application like the menu, header and/or footer.
    * **specific** page must be created at the `root` of this folder
    

To display the **HTML** content of the `hello world` page, follow these steps:

* Launch server

```javascript
$ cd /path/to/workspace/hapi-structure

$ gulp or gulp:front-application 
```

* Go in your browser at the address `localhost:5000` and you will be redirect to `localhost:5000/v1/hello/world`

```html
<!doctype html>
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->
<head>
    <base href="/">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,  initial-scale=1.0, user-scalable=no">
    <!-- Legal information -->
    <title>Hapi.js Project Structure</title>
    <meta name="author" content="NJL">
    <meta name="description" content="Hapi.js Project Structure and Implementation">
    <meta name="google-site-verification" content="">
    <meta name="Copyright" content="Nicolas Jessel">
    <!-- Hiding Safari User Interface Components -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- Changing the Status Bar Appearance -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!-- Disables automatic detection of possible phone numbers -->
    <meta name="format-detection" content="telephone=no">
    <!-- Content optimized for mobile -->
    <meta name="HandheldFriendly" content="true">
    <!-- Disable compatibility mode IE -->
    <!--[if IE]>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <![endif]-->
    <!-- Language -->
    <meta http-equiv="content-language" content="en">

    <link rel="shortcut icon" sizes="16x16" href="assets/images/favicon.ico" />
    <link rel="apple-touch-icon" sizes="60x60" href="assets/images/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="assets/images/apple-touch-icon/touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/images/apple-touch-icon/touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/images/apple-touch-icon/touch-icon-ipad-retina.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon/touch-icon-iphone-plus-retina.png">

    <!-- build:css({.tmp,client}) client/styles/vendor.css -->
    <link rel="stylesheet" href="styles/vendor.css">
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->


    <!-- build:css({.tmp,client}) client/styles/app.css -->
    <!-- inject:css -->
    <link rel="stylesheet" href="styles/index.css">
    <!-- endinject -->
    <!-- endbuild -->

    <!-- build:js client/scripts/modernizr.js -->
    <script src="bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->
</head>
<body>

<h1>Welcome NJL on Hapi.js Project Structure!</h1>

<!-- build:js client/scripts/vendor.js -->
<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<!-- endbower -->
<!-- endbuild -->

<!-- build:js({.tmp,client}) client/scripts/app.js -->
<!-- inject:js -->
<script src="scripts/ready.js"></script>
<!-- endinject -->
<!-- endbuild -->
</body>
</html>
```

We can see that in `development` mode, **bower components** are presents in the displayed **HTML**.

We will see that's different when application is **packaged** in **production** mode.

All templates are combined to display final result.

## Gulp scripts

The **main file** is `gulpfile.js`. It includes all files from `gulp` folder and initialize **default** script.
 
* `server.js` => scripts to **launch** server in `development continuous` mode
* `watch.js` => script to watch **client** updates and launch associated tasks
* `wiredep.js` => script to insert **bower components** dependencies in layout
* `build.js` => scripts to inject **custom** dependencies in layout and to build application

Only these scripts are interesting:

* `gulp serve:front-application` or `gulp`(***default***) => script to launch **front** application
* `gulp serve:api-application` => script to launch **API** application
* `gulp build:front-application` => script to build **front** application
* `gulp build:api-application` => script to build **API** application

All others scripts can be launched **manually** but it's not necessary. 

## Packaging


## TODO

* Write Tests with [Lab](https://github.com/hapijs/lab) and [Code](https://github.com/hapijs/code).
* Update layout with [bootstrap](http://getbootstrap.com) to show example.
* Create HTML pages to display custom content when error occurred (`400`, `404`, `500`, ...)

## Release History

| Version    | Notes       |
|:-----------|:------------|
| 0.8.0      | README |
| 0.7.0      | Packaging |
| 0.6.0      | Gulp scripts |
| 0.5.0      | Bower integration |
| 0.4.0      | i18n management |
| 0.3.0      | Hello world example |
| 0.2.0      | Design management |
| 0.1.0      | Project structure |
| 0.0.1      | First Prototype |

## License
Copyright (c) 2015 Nicolas Jessel. Licensed under the [MIT license](https://github.com/njl07/hapi-structure/blob/master/LICENSE.md).