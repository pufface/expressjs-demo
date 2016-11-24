var express = require('express')
var bodyParser = require('body-parser')
var JSONStream = require('JSONStream')

var connection = require('./db')
var rootController = require('./controller/root')
var userController = require('./controller/user')


var app = express()
app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/public', express.static('./public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// keep first in app stack
app.use(function(req, res, next) {
  console.log(new Date(), req.method, req.path, req.params);
  next()
})

app.use('/', rootController)
app.use('/:username', userController)


// keep at the end of app stack
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

var server = app.listen(3000, function() {
  console.log('Server running at http://localhost:' + server.address().port);
})
