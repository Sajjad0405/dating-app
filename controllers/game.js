exports.game = function(req, res) {
  res.render('game.ejs', {
    user: req.session.user
  })
}