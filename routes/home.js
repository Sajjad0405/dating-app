exports.home = function (req, res) {

  db.collection('Users').find().toArray(done)
  function done(err, data) {
    if(err) {
      next(err)
    } else {
      res.render('index.ejs', {
        data,
        user: req.session.user
      })
    }
  }
}