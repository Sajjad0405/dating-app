//Check if the session is still active, otherwise redirect to login view
exports.redirectLogin = function (req, res, next) {
  if (!req.session.user) {
      res.redirect('/login')
  } else {
      next()
  }
}