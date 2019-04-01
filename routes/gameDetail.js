const mongo = require('mongodb');

exports.gameDetail = function (req, res) {
  db.collection('Games').find().toArray(done)
  function done(err, data) {
    if(err) {
      next(err)
    } else {
      res.render('profile.ejs', {data})
    }
  }
}