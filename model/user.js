var mongoose = require('mongoose')
var Schema = mongoose.Schema

var user = new Schema({
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

user.virtual('name.full').get(function(){
  return this.name.first + ' ' + this.name.last
})

user.virtual('name.full').set(function(value) {
  var bits = value.split(' ')
  this.name.first = bits[0]
  this.name.last = bits[1]
})

module.exports = mongoose.model('User', user)