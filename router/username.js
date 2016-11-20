var express = require('express')
var helpers = require('../helpers')

var router = express.Router({
  mergeParams: true
})

router.all('/', function(req, res, next) {
  console.log(req.method, 'for', req.params.username);
  next()
})

router.get('/', helpers.verifyUser, function(req, res) {
  helpers.getUser(req.params.username, function(user) {
    res.render('user', {
      user: user,
      address: user.location
    })
  })
})

router.get('/json', function(req, res) {
  res.download('./users/' + req.params.username + '.json')
})

router.get('/data', function(req, res) {
  var username = req.params.username
  var user = helpers.getUser(username, function(user) {
    res.json(user)
  })
})

router.put('/', function(req, res) {
  helpers.mergeUser(req.params.username, {location: req.body}, function() {
    res.end()
  })
})

router.delete('/', function(req, res) {
  helpers.deleteUser(req.params.username, function() {
    res.sendStatus(200)
  })
})

module.exports = router
