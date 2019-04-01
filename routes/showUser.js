const mongo = require('mongodb');

exports.showUser = function (req, res) {
    let id = req.params.id
    db.collection('Users').findOne({
        _id: mongo.ObjectID(id)
    }, function(err, data) {
        if (err) {
            console.log('An error has occured', err)
        } else {
            res.render('user.ejs', {
                data,
                user: req.session.user
            })
        }
    })
  }