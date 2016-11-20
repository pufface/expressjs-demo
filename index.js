var express = require('express')
var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var bodyParser = require('body-parser')

var app = express()
app.set('views', './views')
app.set('view engine', 'hbs')
app.use('/profilepic', express.static('images'))
app.use('/js', express.static('js'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var readUsers = function(callback) {
  var usersDir = path.join(__dirname, 'users')
  var users = []
  fs.readdir(usersDir, function(err, files) {
    files.forEach(function(file) {
      readUser(path.join(usersDir,file), function(user) {
        users.push(user)
        if (users.length === files.length) {
          callback(users)
        }
      })
    })
  })
}

var readUser = function(file, callback) {
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) throw err
    var user = JSON.parse(data)
    user.name.full = _.startCase(user.name.first + " " + user.name.last)
    callback(user)
  })
}

var userFile = function(username) {
  return path.join(__dirname, 'users', username + '.json')
}

var getUser = function(username, callback) {
  readUser(userFile(username), callback)
}

var deleteUser = function(username, callback) {
  fs.unlink(userFile(username), function(err) {
    if (err) throw err
    callback()
  })
}

var saveUser = function(user, callback) {
  var file = userFile(user.username)
  var data = JSON.stringify(user)
  fs.writeFile(file, data, function(err) {
    if (err) throw err
    callback()
  })
}

var mergeUser = function(username, user, callback) {
  getUser(username, function(origUser) {
    var mergedUser = _.merge(origUser, user)
    saveUser(mergedUser, callback)
  })
}

var verifyUser = function(req, res, next) {
  var file = userFile(req.params.username)
  fs.exists(file, function(exists) {
    if (exists) {
      next()
    } else {
      res.redirect('/error/' + req.params.username)
    }
  })
}

app.get('/', function(req, res) {
  readUsers(function(users) {
    res.render('index', {users: users})
  })
})

app.all('/:username', function(req, res, next) {
  console.log(req.method, 'for', req.params.username);
  next()
})

app.get('*.json', function(req, res) {
  res.download('./users/' + req.path)
})

app.get('/data/:username', function(req, res) {
  var username = req.params.username
  var user = getUser(username, function(user) {
    res.json(user)
  })
})

app.get('/:username', verifyUser, function(req, res) {
  getUser(req.params.username, function(user) {
    res.render('user', {
      user: user,
      address: user.location
    })
  })
})

app.get('/error/:username', function(req, res) {
  res.status(404).send('No user named ' + req.params.username + ' found')
})

app.put('/:username', function(req, res) {
  mergeUser(req.params.username, {location: req.body}, function() {
    res.end()
  })
})

app.delete('/:username', function(req, res) {
  deleteUser(req.params.username, function() {
    res.sendStatus(200)
  })
})


var server = app.listen(3000, function() {
  console.log('Server running at http://localhost:' + server.address().port);
})
