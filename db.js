var mongoose = require('mongoose')

var uri = 'mongodb://localhost:27017/test'

var db = mongoose.connect(uri).connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(callback) {
  console.log('db connected')
})

var userSchema = mongoose.Schema({
  username: String,
  gender: String,
  name: {
    title: String,
    first: String,
    last: String
  },
  email: String,
  location: {
    state: String,
    city: String,
    street: String,
    zip: String
  }
})

userSchema.virtual('name.full').get(function(){
  return this.name.first + ' ' + this.name.last
})

userSchema.virtual('name.full').set(function(value) {
  var bits = value.split(' ')
  this.name.first = bits[0]
  this.name.last = bits[1]
})

exports.User = mongoose.model('User', userSchema)


// Useage of pure MongoClient
// var mongodb = require('mongodb')
//
// var uri = 'mongodb://localhost:27017/test'
//
// var MongoClient = mongodb.MongoClient
//
// var findUsers = function(db, callback) {
//   var cursor = db.collection('users').find()
//   cursor.each(function(err, doc) {
//     if (doc != null) {
//       console.dir(doc)
//     } else {
//       callback()
//     }
//   })
// }
//
// MongoClient.connect(uri, function(err, db) {
//   findUsers(db, function() {
//     db.close()
//   })
// })
