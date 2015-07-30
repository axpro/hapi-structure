<img src="https://raw.github.com/hapijs/hapi/master/images/hapi.png" />

## Hapi.js Project Structure and Implementation

This project describes the structure of an [Hapi.js](http://www.hapijs.com) server implementation.

We will explain all phases of the project integration, configuration and libraries used, scripts for the continued development and packaging of the production application.

### Contents

* [Installation](#installation)
    [Client/Server application](#client-server-application)
    [Server application](#server-application)

## Installation

You must clone the project:

```javascript
cd /path/to/workspace

git clone git@github.com:njl07/hapi-structure.git
```

After that the project structure will be in your worskpace. 

Project contains `client` and `server` elements. 

If you want only use the `sever` side of the project, the following files and folders will be useless:

* `./client`
* `./config/../design.json`
    * `./index.js` should be override to delete reference in `internals.configs` variable
    * the same in `./config/plugin.json`
* `./lib/design`
* `./lib/hello/../world`

These files contain all the elements for the result of the HTML display.

When the structure is OK for you, you must install all dependencies.

### Client/Server application

For this part, you must install `npm` and `bower` packages:
  
```javascript
cd /path/to/workspace/hapi-structure

npm install && bower install
```

Folders `node_modules` and `bower_components` will be created.

### Server application

For this part, you must install `npm` packages:
  
```javascript
cd /path/to/workspace/hapi-structure

npm install
```

Folder `node_modules` will be created.

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