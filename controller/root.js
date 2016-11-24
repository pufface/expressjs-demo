var express = require('express')
var User = require('../model/user')

var router = express.Router({
  mergeParams: true
})

router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) next(err)
    res.render('user-list', {users: users})
  })
})

module.exports = router