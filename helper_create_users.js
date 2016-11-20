var fs = require('fs')
var path = require('path')
var _ = require('lodash')

var usersGenerator = function() {
  var counter = 0
  return function(firstName, lastName) {
    var isFemale = Math.random() > 0.5
    counter += 1
    return {
      gender: isFemale ? 'female' : 'male',
      name: {
        title: isFemale ? (Math.random() > 0.5 ? 'miss' : 'mrs') : 'mr',
        first: firstName,
        last: lastName
      },
      username: _.toLower(firstName + lastName),
      email: firstName + '.' + lastName + '@mail.com',
      location: {
        state: 'state' + counter,
        city: 'city' + counter,
        street: 'street' + counter,
        zip: 'zip' + counter
      }
    }
  }
}

var createUsers = function() {
  var createUser = usersGenerator()
  return [
    createUser('Mary', 'Jones'),
    createUser('Alan', 'Walter'),
    createUser('Miriam', 'Wallace'),
    createUser('william', 'Ryan'),
    createUser('Gail', 'Morales'),
    createUser('Big', 'First'),
    createUser('Big', 'Second')
  ]
}

var copyFile = function(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

var copyUserImage = function(srcBig, srcSmall) {
  return function(user) {
    copyFile(srcBig, 'images/' + user.username + '_bg.png')
    copyFile(srcSmall, 'images/' + user.username + '_sm.png')
  }
}

var storeUser = function(dstDir) {
  return function(user) {
    var file = path.join(dstDir, user.username + '.json')
    var data = JSON.stringify(user)
    fs.writeFile(file, data, function(err) {
      if (err) throw err
      console.log('User ' + user.username + ' created');
    })
  }
}


var users = createUsers()
users.forEach(storeUser('users'))
users.forEach(copyUserImage('images/bg.png', 'images/sm.png'))
