const mongo = require('mongodb')

exports.profile = function (req, res) {
    db.collection('Games').find().toArray(done)
    function done(err, data) {
      if(err) {
        next(err)
      } else {
        res.render('profile.ejs', {
          data,
          game: req.session.game,
          user: req.session.user
        })
      }
    }
  }