var express = require('express')
var User = require('../model/user')

var router = express.Router({
  mergeParams: true
})

router.get('/', (req, res) => {
  var username = req.params.username
  User.findOne({username}, (err, user) => {
    if (err) return next(err)
    res.render('user-detail', {
      user,
      address: user.location
    })
  })
})

router.put('/', (req, res) => {
  var username = req.params.username
  User.findOne({username}, (err, user) => {
    if (err) return next(err)
    user.name.full = req.body.name
    user.location = req.body.location
    user.save((err, data) => {
      res.end()
    })
  })
})

router.delete('/', (req, res) => {
  var username = req.params.username
  User.findOneAndRemove({username}, (err) => {
    if (err) return next(err)
    res.sendStatus(200)
  })
})

router.get('/json', (req, res) => {
  var username = req.params.username
  User.findOne({username}, (err, user) => {
    if (err) return next(err)
    res.json(user)
  })
})

router.get('/data', (req, res) => {
  var username = req.params.username
  User.findOne({username}, (err, user) => {
    if (err) return next(err)
    res.type('bin').send(JSON.stringify(user))
  })
})

module.exports = router
