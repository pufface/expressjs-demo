var express = require('express')
var bodyParser = require('body-parser')
var helpers = require('./helpers')
var usernameRouter = require('./router/username')

var app = express()
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/profilepic', express.static('images'))
app.use('/js', express.static('js'))
app.use('/:username', usernameRouter)

app.get('/', function(req, res) {
  helpers.readUsers(function(users) {
    res.render('index', {users: users})
  })
})

app.get('/error/:username', function(req, res) {
  res.status(404).send('No user named ' + req.params.username + ' found')
})

var server = app.listen(3000, function() {
  console.log('Server running at http://localhost:' + server.address().port);
})
