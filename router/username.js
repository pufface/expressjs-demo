var express = require('express')
var helpers = require('../helpers')

var router = express.Router({
  mergeParams: true
})

router.use(function(req, res, next) {
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
  var readable = helpers.getUserStream(req.params.username)
  readable.pipe(res)
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
