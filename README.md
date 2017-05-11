# purify

experimental stuff, not something you want to rely on :-)


## Prerequisites

* alxhub/ngo
* uglify-js@^2.8.0
* tslib


## Install
```
yarn add igorminar/purify
patch --forward node_modules/@angular/cli/models/webpack-configs/production.js node_modules/purify/angular-cli.patch
```
