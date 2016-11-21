var express = require('express')
var bodyParser = require('body-parser')
var JSONStream = require('JSONStream')
var helpers = require('./helpers')
var usernameRouter = require('./router/username')
var User = require('./db').User

var app = express()
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/profilepic', express.static('images'))
app.use('/js', express.static('js'))
app.use('/:username', usernameRouter)

app.use(function(req, res, next) {
  console.log(new Date(), req.method, req.path, req.params);
  next()
})

app.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.render('index', {users: users})
  })
})

app.get('/users/by/:gender', function(req, res) {
  var gender = req.params.gender
  var readable = helpers.getUsersStream()
  readable
    .pipe(JSONStream.parse('*', function(user) {
      if (user.gender === gender) {
        return user.name
      }
    }))
    .pipe(JSONStream.stringify('[\n ', ',\n ', '\n]\n'))
    .pipe(res)
})

app.get('/error/:username', function(req, res) {
  res.status(404).send('No user named ' + req.params.username + ' found')
})

var server = app.listen(3000, function() {
  console.log('Server running at http://localhost:' + server.address().port);
})
