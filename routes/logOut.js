//Logout as a user and get redirected to index/home. The session gets destoyed!
exports.logOut = function (req, res) {
  req.session.destroy(function (err) {
      if (err) {
          console.log("An error has occured", err)
      } else {
          res.redirect('/')
      }
  })
}