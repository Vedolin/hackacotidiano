
/*
 * GET page.
 */

exports.index = function(req, res){
  res.render('index', {
  	title   : 'Curriculo'
  });
};

