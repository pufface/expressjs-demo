var express = require('express')
var User = require('../model/user')

var router = express.Router({
  mergeParams: true
})

router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err)
    res.render('user-list', {users: users})
  })
})

module.exports = router