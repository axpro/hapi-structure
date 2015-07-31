<table border="0" cellspacing="0" cellpadding="0" bordercolor="none">
    <tr>
        <td width="120" align="center">
            <img src="https://raw.github.com/hapijs/hapi/master/images/hapi.png" width="100" height="70"/>
        </td>
        <td width="120" align="center">
            <img height="70" width="31" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
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