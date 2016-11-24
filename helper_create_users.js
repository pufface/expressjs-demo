var fs = require('fs')
var path = require('path')
var _ = require('lodash')

var usersGenerator = () => {
  var counter = 0
  return (firstName, lastName) => {
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

var createUsers = () => {
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

var storeUser = (dstDir) => (user) => {
  var file = path.join(dstDir, user.username + '.json')
  var data = JSON.stringify(user)
  fs.writeFile(file, data, (err) => {
    if (err) throw err
    console.log('User ' + user.username + ' created')
  })
}

var storeUserList = (users, file) => {
  var writable = fs.createWriteStream(file)
  users.forEach((user) => {
    writable.write(JSON.stringify(user))
    writable.write('\n')
  })
  writable.end()
  console.log('Mongodb export is done')
}

var storeUsers = (users, file) => {
  var data = JSON.stringify(users)
  fs.writeFile(file, data, (err) => {
    if (err) throw err
    console.log('All users saved: ', file)
  })
}

var copyFile = (src, dst)  => {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

var copyUserImage = (srcBig, srcSmall) => (user) => {
  copyFile(srcBig, 'public/profilepics/' + user.username + '_bg.png')
  copyFile(srcSmall, 'public/profilepics/' + user.username + '_sm.png')
}

var users = createUsers()
// users.forEach(storeUser('users'))
users.forEach(copyUserImage('public/profilepics/bg.png', 'public/profilepics/sm.png'))
// storeUsers(users, 'users.json')
storeUserList(users, 'users_list.json')
