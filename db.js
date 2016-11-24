var mongoose = require('mongoose')
var connection = mongoose.connection
var Schema = mongoose.Schema

var uri = 'mongodb://localhost:27017/test'

mongoose.connect(uri, function(err) {
  if (err) throw err
})

connection.on('error', console.error.bind(console, 'db connection error:'))
connection.on('open', console.log.bind(console, 'db connection opened'))
connection.on('connected', console.log.bind(console, 'db conected'))
connection.on('disconnected', function() {
  throw new Error('DB connection lost')
})

process.on('SIGINT', function () {
  connection.close(function(){
    process.exit(0)
  })
})

module.exports = connection
