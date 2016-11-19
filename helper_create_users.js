var fs = require('fs')
var _ = require('lodash')

var createUser = function(firstName, lastName) {
  var isFemale = Math.random() > 0.5
  return {
    gender: isFemale ? 'female' : 'male',
    name: {
      title: isFemale ? (Math.random() > 0.5 ? 'miss' : 'mrs') : 'mr',
      first: firstName,
      last: lastName
    },
    username: _.toLower(firstName + lastName),
    email: firstName + '.' + lastName + '@mail.com'
  }
}

var users = []
users.push(createUser('Mary', 'Jones'))
users.push(createUser('Alan', 'Walter'))
users.push(createUser('Miriam', 'Wallace'))
users.push(createUser('william', 'Ryan'))
users.push(createUser('Gail', 'Morales'))
users.push(createUser('Big', 'First'))
users.push(createUser('Big', 'Second'))

fs.writeFile('./users.json', JSON.stringify(users), function(err) {
  if (err) throw err
  console.log('Users created');
})

var copyFile = function(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

users.forEach(function(user) {
  var srcBig = 'images/bg.png'
  var srcSmall = 'images/sm.png'
  copyFile(srcBig, 'images/' + user.username + '_bg.png')
  copyFile(srcSmall, 'images/' + user.username + '_sm.png')
})
