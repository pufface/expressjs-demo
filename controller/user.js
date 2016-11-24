var express = require('express')
var User = require('../model/user')

var router = express.Router({
  mergeParams: true
})

router.get('/', function(req, res) {
  var username = req.params.username
  User.findOne({username: username}, function(err, user) {
    if (err) next(err)
    res.render('user-detail', {
      user: user,
      address: user.location
    })
  })
})

router.put('/', function(req, res) {
  var username = req.params.username
  User.findOne({username: username}, function(err, user) {
    if (err) next(err)
    user.name.full = req.body.name
    user.location = req.body.location
    user.save(function(err, data) {
      res.end()
    })
  })
})

router.get('/json', function(req, res) {
  var username = req.params.username
  User.findOne({username: username}, function(err, user) {
    if (err) next(err)
    res.json(user)
  })
})

router.get('/data', function(req, res) {
  var username = req.params.username
  User.findOne({username: username}, function(err, user) {
    if (err) next(err)
    res.type('bin').send(JSON.stringify(user))
  })
})

router.delete('/', function(req, res) {
  var username = req.params.username
  User.findOneAndRemove({username: username}, function(err){
    if (err) next(err)
    res.sendStatus(200)
  })
})

module.exports = router
