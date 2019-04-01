const mongo = require('mongodb');

//Check if user has the correct credentials to login
exports.checkUser = function (req, res) {
  db.collection('Users').find().toArray(done)
  function done(err, data) {
    for(let i = 0; i < data.length; i++) {
      if(err) {
        console.log("An error has occured", err)
      } else if (req.body.username.toLowerCase() === data[i].username && req.body.password === data[i].password) {
        let id = data[i]._id

        req.session.user = {
          id: id,
          username: req.body.username,
          password: req.body.password,
          age: data[i].age,
          gender: data[i].gender,
          profilePic: data[i].profilePic
        }
        res.redirect('/' + id)
      } else {
        res.redirect('/login.ejs')
      }
    }
  }
}