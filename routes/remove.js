const mongo = require('mongodb');

//Remove a game
exports.remove = function(req, res) {
    let id = req.params.id
    db.collection('Games').deleteOne({
      _id: mongo.ObjectID(id)
    }, done)
    function done(err) {
      if (err) {
        next(err)
      } else {
        res.json({status: 'ok'})
      }
    }
}