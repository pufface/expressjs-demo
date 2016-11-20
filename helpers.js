var fs = require('fs')
var _ = require('lodash')
var path = require('path')

var readUsers = function(callback) {
  var usersDir = path.join(__dirname, 'users')
  var users = []
  fs.readdir(usersDir, function(err, files) {
    if (err) throw err
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

var getUserFilePath = function(username) {
  return path.join(__dirname, 'users', username + '.json')
}

var getUser = function(username, callback) {
  readUser(getUserFilePath(username), callback)
}

var deleteUser = function(username, callback) {
  fs.unlink(getUserFilePath(username), function(err) {
    if (err) throw err
    callback()
  })
}

var saveUser = function(user, callback) {
  var file = getUserFilePath(user.username)
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
  var file = getUserFilePath(req.params.username)
  fs.exists(file, function(exists) {
    if (exists) {
      next()
    } else {
      res.redirect('/error/' + req.params.username)
    }
  })
}

exports.readUsers = readUsers
exports.getUser = getUser
exports.getUserFilePath = getUserFilePath
exports.mergeUser = mergeUser
exports.verifyUser = verifyUser
