# Egghead Notes: Getting Started with Express.js

My notes on course Getting Started with Express.js.
Branches approximately follows lessons.

`>git checkout 00-empty-repo`

## 01 Getting Started with Express - Up and Running

Run express on node:
```
>npm init -y \\init empty node project, default settings
>npm i -S express \\add express module
>npm i -D nodeman \\add module nodemon to node dev dependecies
>npn start \\run start script see package.json>scripts>start
>npm run dev \\run dev scripts see package.json>scripts>dev
```

Register handler to HTTP GET method: `app.get(path, callback)`.
Callback function parameters are: `req`, `res`.

`>git checkout 01-express-run`

## 02 Getting Started with Express - Routing Basics

```
>npm i -S lodash \\add lodash modules (utility library)
>node helper_create_users.js \\run js script for create users.json
```

Callback functions params: `req`, `res`, `next`. Call next registered handler within matched path by `next()`. Registered handlers are called in same order as been declared.

`>git checkout 02-express-route`

## 03 Getting Started with Express - Template Engines

Install template engines: Handlebars and pug(Jade):
```
>npm i -S pug
>npm i -S hbs
```

Add view directory: `app.set('views', './views')`
Add view template engine: `app.set('view engine', engine)`. View engine such as `hbs` or `pug`.
Render template call on res object: `res.render('path', context)`

`>git checkout 03-express-template`

## 04 Getting Started with Express - Static Files

Set up serving static content by `app.use([path,] callback)`.
Serves static files from 'images' directory within path 'profilepic': `app.use('profilepic', express.static('images'))`.

`>git checkout 04-express-staticfiles`

## 05 Getting Started with Express - HTTP Verbs

Body-parser middleware parses request params to `req.body`, install: `>npm i -S body-parser`.

Use other HTML methods:
- `app.delete`
- `app.put`

`>git checkout 05-express-http`

## 06 Getting Started with Express - Advanced Routing

Validate inputs by middleware method: `app.get(path, middleware, callback)`.
Log request by middleware: `app.all(path, callback)` via call next callback.

Other response methods:
- `res.download(file, [fileName])` send file bytes as fileName
- `res.json(object)` send object as json

`>git checkout 06-express-routing-advanced`

## 07 Getting Started with Express - Routing Code Organization

Chain handlers with same path by `app.route(path).handler1().handler2()...`

Separate router handlers with same path through:
```
var router = express.Router({
  mergeParams: true
})
```

`>git checkout 07-express-routing-refactored`

## 08 Getting Started with Express - Using Streams

Copy file with piping streams: `fs.createReadStream(src).pipe(fs.createWriteStream(dst));`

JSONStream streaming JSON.parse and JSON.stringify methods, isntall `>npm i -S JSONStream`.

`>git checkout 08-express-streams`

## 09 Getting Started with Express - Middleware

App handler middleware:
```
app.use(function(req, res, next) {
  console.log(new Date(), req.method, req.path, req.params);
  next()
})
```

Error handler middleware:
```
app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something broke')
})
```

`>git checkout 09-express-middleware`

## 10 Getting Started with Express - MongoDB Integration

Install and run mongodb in local directory:
```
>npm i -S mongodb
>mkdir mongod
>mongod --dbpath mongo
>mongoimport --db test --dbpath mongo --collection users --drop --file users_list.json
```

Mongoose = mongodb object modeling for nodejs: `>npm i -S mongoose`
Mongoose schema maps MongoDb collection and defines the shape of its documents to objects.

Statement `console.error.bind(console, 'connection error:')` create reference to `console.error` function called within `console` context and pass first argument.

Mongo basic operations:
- `find(query)`
- `findOne(query)`
- `findAndModify(query)`

`>git checkout 10-express-mongodb`

## 11 Using virtual properties with Mongoose and MongoDB

Virtual properties are defined by getters and setters on mongoose schema.

`>git checkout 11-express-mongoose-virtualprops`

## 12 Refactoring + ES6 Syntax

`>git checkout 12-refactor-es6`

## Debug
Debug stand alone js file `>node-debug helper_create_users.js`.
Debug nodemon: `>npm run debug` and run in separate console `>node-inspector`.
