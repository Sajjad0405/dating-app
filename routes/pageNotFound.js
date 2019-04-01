//Manier van Kaan gebruikt. Bron: https://github.com/cenikk/datingapp/blob/master/index.ejs
exports.pageNotFound = function(req, res) {
    res.status(404).render('404.ejs')
  }